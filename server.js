const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'biotech.pharmaease@gmail.com',
        pass: 'yslpmnfecfoubrtu',
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    transporter.sendMail({
        from: 'biotech.pharmaease@gmail.com',  
        to, 
        subject,
        text,
    }, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao enviar e-mail', error: error.toString() });
        }
        res.status(200).json({ message: 'E-mail enviado com sucesso', info: info });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});