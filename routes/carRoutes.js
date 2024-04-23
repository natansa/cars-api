import express from 'express';
import carService from '../services/carService.js';

const router = express.Router();

// obter a(s) marca(s) com mais modelos
router.get('/maisModelos', async (req, res, next) => {
    try {
        var result = await carService.getBrandWithMostModels();
        res.json(result);    
        logger.info(`GET /cars/maisModelos - ${result}`);
    } catch (error) {
        next(error);
    }
});

// obter a(s) marca(s) com menos modelos
router.get('/menosModelos', async (req, res, next) => {
    try {
        var result = await carService.getBrandWithLeastModels();
        res.json(result);    
        logger.info(`GET /cars/menosModelos - ${result}`);
    } catch (error) {
        next(error);
    }
});

// obter a lista das X marcas com mais modelos
router.get('/listaMaisModelos/:count', async (req, res, next) => {
    try {
        const count = parseInt(req.params.count);
        var result = await carService.getTopBrandsByModelCount(count);
        res.json(result);    
        logger.info(`GET /cars/listaMaisModelos/${count} - ${result}`);
    } catch (error) {
        next(error);
    }
});

// obter a lista das X marcas com menos modelos
router.get('/listaMenosModelos/:count', async (req, res, next) => {
    try {
        const count = parseInt(req.params.count);
        var result = await carService.getBottomBrandsByModelCount(count);
        res.json(result);    
        logger.info(`GET /cars/listaMenosModelos/${count} - ${result}`);
    } catch (error) {
        next(error);
    }
});

// obter a lista de modelos de uma marca específica via POST
router.post('/listaModelos', async (req, res, next) => {
    try {
        const { nomeMarca } = req.body;
        var result = await carService.getModelsByBrand(nomeMarca);
        res.json(result);
        logger.info(`POST /cars/listaModelos - ${nomeMarca} - ${result}`);
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;