// API Route (Next.js API Handler) for car parts - adjust for your stack

import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, Request as SqlRequest, TYPES } from 'tedious';

// Replace with your actual SQL config!
const config = {
  server: 'YOUR_SQL_SERVER',
  authentication: {
    type: 'default',
    options: {
      userName: 'YOUR_SQL_USER',
      password: 'YOUR_SQL_PASSWORD',
    },
  },
  options: {
    database: 'YOUR_DATABASE',
    encrypt: true,
    rowCollectionOnRequestCompletion: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Search car parts
    const search = req.query.search as string | undefined;
    const connection = new Connection(config);

    connection.on('connect', err => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      let query = 'SELECT TOP 20 id, name, description, location FROM CarParts';
      if (search) {
        query += ` WHERE name LIKE '%${search.replace(/'/g, "''")}%' OR description LIKE '%${search.replace(/'/g, "''")}%'`;
      }

      const request = new SqlRequest(query, (err, rowCount, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          connection.close();
          return;
        }
        const result = rows.map(row =>
          Object.fromEntries(row.map(col => [col.metadata.colName, col.value]))
        );
        res.status(200).json(result);
        connection.close();
      });

      connection.execSql(request);
    });

    connection.connect();
  } else if (req.method === 'POST') {
    // Add a new car part
    const { name, description, location } = req.body;
    const connection = new Connection(config);

    connection.on('connect', err => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const request = new SqlRequest(
        `INSERT INTO CarParts (name, description, location) VALUES (@name, @description, @location)`,
        err => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(201).json({ message: 'Car part added successfully' });
          }
          connection.close();
        }
      );
      request.addParameter('name', TYPES.NVarChar, name);
      request.addParameter('description', TYPES.NVarChar, description);
      request.addParameter('location', TYPES.NVarChar, location);
      connection.execSql(request);
    });

    connection.connect();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}