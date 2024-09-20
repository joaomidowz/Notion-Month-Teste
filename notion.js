require('dotenv').config(); // Certifique-se de que você tenha a biblioteca dotenv instalada

const { Client } = require('@notionhq/client');

// Inicialize o cliente da API do Notion
const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

async function updateCheckbox(databaseId) {
    const today = new Date();
    const day = today.getDate();

    if (day === 1) {
        const response = await notion.databases.query({ database_id: databaseId });

        response.results.forEach(async (page) => {
            await notion.pages.update({
                page_id: page.id,
                properties: {
                    "Pago": {
                        checkbox: false
                    }
                }
            });
        });
    }
}

// Chame a função passando o ID do seu banco de dados
updateCheckbox('e4fcb2ac-44a6-4be4-945a-ff13e4b3d64a');
