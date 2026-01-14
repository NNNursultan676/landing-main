/**
 * API сервер для управления контентом сайта
 * Микросервис для работы с данными (вакансии, статьи, команда и т.д.)
 * Порт: 3002
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;
const DATA_DIR = path.join(__dirname, 'data');

// Создаем директорию для данных, если её нет
fs.ensureDirSync(DATA_DIR);

// Вспомогательные функции для работы с JSON-файлами (асинхронно)
const readJsonFile = async (filename, defaultValue) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const exists = await fs.pathExists(filePath);
    if (!exists && defaultValue !== undefined) {
      await fs.writeJson(filePath, defaultValue, { spaces: 2 });
      return defaultValue;
    }
    return await fs.readJson(filePath);
  } catch (error) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw error;
  }
};

const writeJsonFile = async (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeJson(filePath, data, { spaces: 2 });
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Инициализация файлов данных, если их нет
const initDataFiles = () => {
  const files = {
    'vacancies.json': [],
    'articles.json': [],
    'team.json': [],
    'applications.json': [],
    'products.json': {
      creditConveyor: {
        clients: ['СДФ', 'BI Finance']
      },
      creditBroker: {
        financialOrganizations: ['Евраз', 'Форте', 'БЦК', 'СДФ', 'Шинхан Финанс', 'Джет Финанс'],
        dealers: 300
      }
    }
  };

  Object.entries(files).forEach(([filename, defaultData]) => {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeJsonSync(filePath, defaultData, { spaces: 2 });
    }
  });
};

initDataFiles();

// ==================== ВАКАНСИИ ====================
/**
 * GET /api/vacancies - Получить все вакансии
 */
app.get('/api/vacancies', async (req, res) => {
  try {
    const data = await readJsonFile('vacancies.json', []);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения вакансий' });
  }
});

/**
 * POST /api/vacancies - Создать новую вакансию
 */
app.post('/api/vacancies', async (req, res) => {
  try {
    const vacancies = await readJsonFile('vacancies.json', []);
    const newVacancy = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    vacancies.push(newVacancy);
    await writeJsonFile('vacancies.json', vacancies);
    res.json(newVacancy);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка создания вакансии' });
  }
});

/**
 * PUT /api/vacancies/:id - Обновить вакансию
 */
app.put('/api/vacancies/:id', async (req, res) => {
  try {
    const vacancies = await readJsonFile('vacancies.json', []);
    const index = vacancies.findIndex(v => v.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Вакансия не найдена' });
    }
    vacancies[index] = { ...vacancies[index], ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile('vacancies.json', vacancies);
    res.json(vacancies[index]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления вакансии' });
  }
});

/**
 * DELETE /api/vacancies/:id - Удалить вакансию
 */
app.delete('/api/vacancies/:id', async (req, res) => {
  try {
    const vacancies = await readJsonFile('vacancies.json', []);
    const filtered = vacancies.filter(v => v.id !== req.params.id);
    await writeJsonFile('vacancies.json', filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления вакансии' });
  }
});

/**
 * POST /api/vacancies/:id/applications - Отправить отклик на вакансию
 * Безопасность: используем whitelist полей, чтобы предотвратить перезапись серверных полей
 */
app.post('/api/vacancies/:id/applications', async (req, res) => {
  try {
    // Проверяем существование вакансии
    const vacancies = await readJsonFile('vacancies.json', []);
    const vacancy = vacancies.find(v => v.id === req.params.id);
    
    if (!vacancy) {
      return res.status(404).json({ error: 'Вакансия не найдена' });
    }

    // Инициализируем файл applications.json, если его нет
    const applications = await readJsonFile('applications.json', []);
    
    // Whitelist разрешенных полей от клиента (безопасность)
    const allowedFields = ['name', 'email', 'phone', 'resume'];
    const clientData = {};
    
    // Извлекаем только разрешенные поля из req.body
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        clientData[field] = req.body[field];
      }
    });
    
    // Создаем объект отклика с серверными полями, которые нельзя перезаписать
    const newApplication = {
      // Серверные поля (не могут быть перезаписаны клиентом)
      id: Date.now().toString(),
      vacancyId: req.params.id,
      vacancyTitle: vacancy.title || req.body.vacancyTitle || '',
      submittedAt: new Date().toISOString(),
      // Данные от клиента (только разрешенные поля)
      ...clientData
    };
    
    applications.push(newApplication);
    await writeJsonFile('applications.json', applications);
    
    res.json({ 
      success: true, 
      message: 'Отклик успешно отправлен',
      applicationId: newApplication.id 
    });
  } catch (error) {
    console.error('Ошибка сохранения отклика:', error);
    res.status(500).json({ error: 'Ошибка отправки отклика' });
  }
});

// ==================== СТАТЬИ/СМИ ====================
/**
 * GET /api/articles - Получить все статьи
 */
app.get('/api/articles', async (req, res) => {
  try {
    const data = await readJsonFile('articles.json', []);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения статей' });
  }
});

/**
 * POST /api/articles - Добавить новую статью
 */
app.post('/api/articles', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json', []);
    const newArticle = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    articles.push(newArticle);
    await writeJsonFile('articles.json', articles);
    res.json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления статьи' });
  }
});

/**
 * PUT /api/articles/:id - Обновить статью
 */
app.put('/api/articles/:id', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json', []);
    const index = articles.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }
    articles[index] = { ...articles[index], ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile('articles.json', articles);
    res.json(articles[index]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления статьи' });
  }
});

/**
 * DELETE /api/articles/:id - Удалить статью
 */
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json', []);
    const filtered = articles.filter(a => a.id !== req.params.id);
    await writeJsonFile('articles.json', filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления статьи' });
  }
});

// ==================== КОМАНДА ====================
/**
 * GET /api/team - Получить информацию о команде
 */
app.get('/api/team', async (req, res) => {
  try {
    const data = await readJsonFile('team.json', {});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения данных команды' });
  }
});

/**
 * PUT /api/team - Обновить информацию о команде
 */
app.put('/api/team', async (req, res) => {
  try {
    const team = await readJsonFile('team.json', {});
    const updated = { ...team, ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile('team.json', updated);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления данных команды' });
  }
});

// ==================== ПРОДУКТЫ ====================
/**
 * GET /api/products - Получить информацию о продуктах
 */
app.get('/api/products', async (req, res) => {
  try {
    const data = await readJsonFile('products.json', {});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения данных продуктов' });
  }
});

/**
 * PUT /api/products - Обновить информацию о продуктах
 */
app.put('/api/products', async (req, res) => {
  try {
    const products = await readJsonFile('products.json', {});
    const updated = { ...products, ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile('products.json', updated);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления данных продуктов' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 API сервер запущен на http://localhost:${PORT}`);
});
