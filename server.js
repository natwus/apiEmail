//api manda email de você para você mesmo com as informaçoes contidas em to, subject e text

const express = require('express'); //framework pra criar um servidor http
const nodemailer = require('nodemailer'); //modulo pra enviar os emails
const cors = require('cors');//modulo para permitor ou restringir solicitação web
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",//serviço de email
    auth: {
        user: 'seu_email',//user que envia a msg
        pass: 'passe', //para gerar o passe, ative a autenticação multifator e selecione o gmail e gerará um passe (no caso do gmail)
    }
});

app.post('/send-email', (req, res) => {  
    const { to, subject, text } = req.body; //recebe as informaçoes da const response no contato.tsx

    transporter.sendMail({ //envia o email
        from: 'seu_email',  
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