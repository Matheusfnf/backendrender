"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarPdf = void 0;
const client_1 = require("@prisma/client");
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
const prisma = new client_1.PrismaClient();
async function gerarPdf(req, res) {
    try {
        const amostraId = parseInt(req.params.id);
        console.log("Req params:", req.params);
        if (isNaN(amostraId)) {
            res.status(400).send("Invalid amostraId parameter");
            return;
        }
        console.log("Amostra ID:", amostraId);
        const amostra = await prisma.amostra.findUnique({
            where: { id: amostraId },
            include: { cliente: true, identAmostra: true },
        });
        const imagePath = path_1.default.join(__dirname, "..", "..", "src", "imgs", "proativalab.png");
        const imageBase64 = fs_1.default.readFileSync(imagePath, { encoding: "base64" });
        // Renderize seu HTML com os dados da amostra e do cliente
        const html = `
     <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      
      text-align: center;
    }

   .logo {
      max-width: 100px;
      margin-bottom: 5px;
      float: left;
}

   h1 {
    font-size: 18px;
    color: #333;
    margin-bottom: 5px;
    margin-left: 10px;
    float: left;
}



  .emissao {
    font-size: 1rem;
    margin-bottom: 5px;
    margin-right: 10px;
    float: right;
}

    .clearfix {
      clear: both;
}

    h2 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 10px;
      background-color: #0FBFEA;
      padding: 3px;
      border: 1px solid black;
      border-radius: 5px;

    }

    p {
      font-size: 12px;
      margin-bottom: 2px;
    }

    .responsavel-tecnico {
      margin-top: 40px;
      text-align: center;
      float: center;
}
    .responsavel-tecnico p {
      font-size: 10px;
      margin-bottom: 2px;
}
    .responsavel-tecnico hr {
      margin: 15px auto;
      border-top: 1px solid #333;
      width: 20%;
}

    .section {
      
      
      margin-bottom: 5px;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      
    }

    .grid-item {
      text-align: left;
    }

    .grid-item p {
          font-size: 10px; /* Tamanho da fonte para as informações cadastrais */
          margin-bottom: 1px; /* Espaçamento vertical entre as informações cadastrais */
        }

    .header-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
}

    .header-item {
    text-align: center;
}
    .resultadosBox {
      background-color: #F4F9F7;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid black;
    }

    .footer {
  font-size: 8px;
  margin-top: 20px;
  text-align: center;
  border-top: 1px solid #333;
  padding-top: 10px;
}

.footer-info {
  font-size: 8px;
  margin-top: 60px;
  text-align: left;
}

   .legenda {
    text-align: center;
    margin-top: 5px;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 5px;
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(6, 1fr); /* Adiciona cinco colunas */
    gap: 5px; /* Espaçamento entre as colunas */
  }

  .legenda h4 {
    font-size: 8px;
    margin: 0;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
  }

   .wrapper h3 {
    font-size: 10px;
  }

    .footer p {
      font-size: 10px;
    }

  </style>
</head>
<body>
  <div class="container">
    <div class="header-grid">
      <div class="header-item">
        <img class="logo" src="data:image/png;base64,${imageBase64}">
      </div>
      <div class="header-item">
        <h1><strong>Laudo Analítico de Controle de Qualidade OnFarm</strong></h1>
      </div>
      <div class="header-item">
        <div class="emissao">Emissão: ${new Date().toLocaleDateString()}</div>
      </div>
    </div>
    
    <div class="section">
      <h2>Informações cadastrais</h2>
      <div class="grid-container">
        <div class="grid-item"><p><strong>Solicitante:</strong> ${amostra.cliente?.name}</p></div>
        <div class="grid-item"><p><strong>Fazenda:</strong> ${amostra.fazenda}</p></div>
        <div class="grid-item"><p><strong>Quem coletou:</strong> ${amostra.quemColetou}</p></div>
        <div class="grid-item"><p><strong>Entregue Por:</strong> ${amostra.entreguePor}</p></div>
        <div class="grid-item"><p><strong>Proprietário:</strong> ${amostra.cliente?.name}</p></div>
        <div class="grid-item"><p><strong>Data coleta:</strong> ${amostra.datadaColeta}</p></div>
        <div class="grid-item"><p><strong>Entrada no laboratório:</strong> ${amostra.entradaNoLab}</p></div>
        <div class="grid-item"><p><strong>Município:</strong> ${amostra.municipio}</p></div>
        <div class="grid-item"><p><strong>Estado:</strong> ${amostra.estado}</p></div>
        <div class="grid-item"><p><strong>Temperatura:</strong> ${amostra.temperatura}</p></div>
      </div>
    </div>

    <div class="section">
  <h2>Apresentação dos resultados</h2>
  ${amostra.identAmostra
            .map((ident, index) => `
        <div class="resultadosBox">
          <div class="grid-container">
            <div class="grid-item"><p><strong>Código:</strong> ${ident.codigo}</p></div>
            <div class="grid-item"><p><strong>Amostra OnFarm:</strong> ${ident.microorganismo}</p></div>
            <div class="grid-item"><p><strong>microorganismo(UFC/ml):</strong> ${ident.ufcmicroorganismo}</p></div>
            <div class="grid-item"><p><strong>Coliformes(UFC/ml):</strong> ${ident.ufccoliformes}</p></div>
            <div class="grid-item"><p><strong>Bolor/levedura(UFC/ml):</strong> ${ident.ufcbolor}</p></div>
          </div>
        </div>
        ${index < amostra.identAmostra.length - 1 ? "<hr>" : ""}
      `)
            .join("")}
</div>
      </div>
       
        
      </div>
      
    </div>
<div class="wrapper">
        <h3><strong>Legenda:</strong></h3>
        <div class="legenda">
      
      
      
        <h4>UFC = unidades formadoras de colônia</h4>
        <h4>N.D = não detectado</h4>
        <h4>NC = não consta</h4>
        <h4>NS = não solicitado</h4>
        <h4>10<sup>0</sup> = 1</h4>
      
      
        <h4>10<sup>1</sup> = 10</h4>
        <h4>10<sup>2</sup> = 100</h4>
        <h4>10<sup>3</sup> = 1.000</h4>
        <h4>10<sup>4</sup> = 10.000</h4>
        <h4>10<sup>5</sup> = 100.000</h4>
      
      
        <h4>10<sup>6</sup> = 1.000.000</h4>
        <h4>10<sup>7</sup> = 10.000.000</h4>
        <h4>10<sup>8</sup> = 100.000.000</h4>
        <h4>10<sup>9</sup> = 1.000.000.000</h4>
        <h4>10<sup>10</sup> = 10.000.000.000</h4>
      
    
    </div>



    <div class="responsavel-tecnico">
    <p><strong>Responsável Técnico:</strong></p>
  <hr>
  <p>Eng. Agr. Leslie Dias Franco</p>
  <p>CREA - 24928/D-GO</p>
</div>
  </div>
  <div class="footer-info">
      <ol>
        <li>As análises são baseadas em morfologia e características encontradas no produto comercial padrão. Não nos responsabilizamos pela garantia dos produtos comerciais.</li>
        <li>Os resultados expressos neste laudo se referem apenas aos parâmetros avaliados da amostra entregue ao Laboratório ProativaLab, não podendo se estender a outras amostras.</li>
        <li>O Laudo de Controle de Qualidade somente poderá ser reproduzido na sua totalidade.</li>
        <li>A identificação da amostra é de exclusiva responsabilidade do requerente.</li>
        <li>A amostra deve apresentar quantidade de material suficiente para o diagnóstico correto, no minimo 200 mL ou 100 gramas.</li>
        <li>Para adequada identificação de gênero e espécie, os microrganismos devem estar em condições morfológicas tais quais sejam reconhecíveis e diagnosticáveis.</li>
        <li>A retenção da amostra para contraprova é de seis dias após a emissão do Laudo de Controle de Qualidade ou de acordo com sua viabilidade.</li>
      </ol>
    </div>
    <div class="footer">
      <p>BIO PROATIVA LAB  - ANÁLISES BIÓLOGICAS</p>
      <p>RUA DOS CARAJÁS , N°888, BAIRRO  CAIÇARAS, PATOS DE MINAS -MG, CEP 38702-188.</p>
      <p>Fone: (34) 9 9303-0633    e-mail:gestaoadm@proativa.agr.br</p>
    </div>
    </div>
  </div>
</body>
</html>

    `;
        // Inicialize o Puppeteer e crie um PDF a partir do HTML
        const executablePath = (await chrome_aws_lambda_1.default.executablePath) || "/usr/bin/google-chrome-stable";
        const browser = await puppeteer_1.default.launch({
            args: chrome_aws_lambda_1.default.args,
            defaultViewport: chrome_aws_lambda_1.default.defaultViewport,
            executablePath,
            headless: chrome_aws_lambda_1.default.headless,
        });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfOptions = {
            format: "A4",
            printBackground: true,
            margin: {
                top: "5mm",
                bottom: "20mm",
                left: "20mm",
                right: "20mm",
            },
        };
        await page.evaluate(() => {
            document.body.innerHTML = document.body.innerHTML.replace(/\^(\d+)/g, "<sup>$1</sup>");
        });
        const pdf = await page.pdf(pdfOptions);
        await browser.close();
        // Enviar o PDF como resposta
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="amostra_${amostraId}.pdf"`);
        res.send(pdf);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("...Erro ao gerar PDF");
    }
}
exports.gerarPdf = gerarPdf;
