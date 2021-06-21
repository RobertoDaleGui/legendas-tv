var express = require('express');
var router = express.Router();
const Subtitle = require('../models/Subtitle')
const { webCrawler } = require('../controller/breaking-bad')

router.get('/', async (req, res) => {
  await Subtitle.find({})
    .then(resp => res.send(JSON.stringify(resp)))
    .catch(err => res.status(500).send('Falha ao listar'))
});

router.post('/', async (req, res) => {
  const { login, password } = req.body
  const subtitle = await webCrawler(login, password)
    .catch(err => console.log(err))
  let legendas = [
    new Subtitle({
      nome: subtitle.nome,
      downloads: subtitle.downloads,
      likes: subtitle.likes,
      unlikes: subtitle.unLikes,
      sender: subtitle.sender,
      date: subtitle.date,
      language: subtitle.language,
      downloadLink: subtitle.downloadLink
    })
  ]
  Subtitle.insertMany(legendas)
    .then(resp => console.log(resp, 'Inseridos com sucesso'))
    .catch(err => console.log(err))
  res.send('Inseridos com sucesso');
});

module.exports = router;
