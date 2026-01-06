import { Layout } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Layout style={{
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     height: '100vh',
    }}>
          <h1 style={{
               fontSize: '5em',
               fontWeight: 'bold',
               color: 'red',
          }}>4</h1>
          <h1 style={{
               fontSize: '4em',
               fontWeight: 'bold',
               color: 'black',
          }}>0</h1>
          <h1 style={{
               fontSize: '5em',
               fontWeight: 'bold',
               color: 'red',
          }}>4</h1>

          <Link to={'/'}>Go to Home</Link>
    </Layout>
  )
}

export default NotFound