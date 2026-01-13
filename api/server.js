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
app.get('/api/vacancies', (req, res) => {
  try {
    const data = fs.readJsonSync(path.join(DATA_DIR, 'vacancies.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения вакансий' });
  }
});

/**
 * POST /api/vacancies - Создать новую вакансию
 */
app.post('/api/vacancies', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'vacancies.json');
    const vacancies = fs.readJsonSync(filePath);
    const newVacancy = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    vacancies.push(newVacancy);
    fs.writeJsonSync(filePath, vacancies, { spaces: 2 });
    res.json(newVacancy);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка создания вакансии' });
  }
});

/**
 * PUT /api/vacancies/:id - Обновить вакансию
 */
app.put('/api/vacancies/:id', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'vacancies.json');
    const vacancies = fs.readJsonSync(filePath);
    const index = vacancies.findIndex(v => v.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Вакансия не найдена' });
    }
    vacancies[index] = { ...vacancies[index], ...req.body, updatedAt: new Date().toISOString() };
    fs.writeJsonSync(filePath, vacancies, { spaces: 2 });
    res.json(vacancies[index]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления вакансии' });
  }
});

/**
 * DELETE /api/vacancies/:id - Удалить вакансию
 */
app.delete('/api/vacancies/:id', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'vacancies.json');
    const vacancies = fs.readJsonSync(filePath);
    const filtered = vacancies.filter(v => v.id !== req.params.id);
    fs.writeJsonSync(filePath, filtered, { spaces: 2 });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления вакансии' });
  }
});

// ==================== СТАТЬИ/СМИ ====================
/**
 * GET /api/articles - Получить все статьи
 */
app.get('/api/articles', (req, res) => {
  try {
    const data = fs.readJsonSync(path.join(DATA_DIR, 'articles.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения статей' });
  }
});

/**
 * POST /api/articles - Добавить новую статью
 */
app.post('/api/articles', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'articles.json');
    const articles = fs.readJsonSync(filePath);
    const newArticle = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    articles.push(newArticle);
    fs.writeJsonSync(filePath, articles, { spaces: 2 });
    res.json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления статьи' });
  }
});

/**
 * PUT /api/articles/:id - Обновить статью
 */
app.put('/api/articles/:id', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'articles.json');
    const articles = fs.readJsonSync(filePath);
    const index = articles.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }
    articles[index] = { ...articles[index], ...req.body, updatedAt: new Date().toISOString() };
    fs.writeJsonSync(filePath, articles, { spaces: 2 });
    res.json(articles[index]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления статьи' });
  }
});

/**
 * DELETE /api/articles/:id - Удалить статью
 */
app.delete('/api/articles/:id', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'articles.json');
    const articles = fs.readJsonSync(filePath);
    const filtered = articles.filter(a => a.id !== req.params.id);
    fs.writeJsonSync(filePath, filtered, { spaces: 2 });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления статьи' });
  }
});

// ==================== КОМАНДА ====================
/**
 * GET /api/team - Получить информацию о команде
 */
app.get('/api/team', (req, res) => {
  try {
    const data = fs.readJsonSync(path.join(DATA_DIR, 'team.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения данных команды' });
  }
});

/**
 * PUT /api/team - Обновить информацию о команде
 */
app.put('/api/team', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'team.json');
    const team = fs.readJsonSync(filePath);
    const updated = { ...team, ...req.body, updatedAt: new Date().toISOString() };
    fs.writeJsonSync(filePath, updated, { spaces: 2 });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления данных команды' });
  }
});

// ==================== ПРОДУКТЫ ====================
/**
 * GET /api/products - Получить информацию о продуктах
 */
app.get('/api/products', (req, res) => {
  try {
    const data = fs.readJsonSync(path.join(DATA_DIR, 'products.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения данных продуктов' });
  }
});

/**
 * PUT /api/products - Обновить информацию о продуктах
 */
app.put('/api/products', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'products.json');
    const products = fs.readJsonSync(filePath);
    const updated = { ...products, ...req.body, updatedAt: new Date().toISOString() };
    fs.writeJsonSync(filePath, updated, { spaces: 2 });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления данных продуктов' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 API сервер запущен на http://localhost:${PORT}`);
});
