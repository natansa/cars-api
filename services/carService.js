import { promises as fs } from 'fs';

let carData;

async function getCarList(){
    var carsFile = await fs.readFile("car-list.json");
    carData = JSON.parse(carsFile);
}

// Retorna a marca(s) com mais modelos, ou uma lista em caso de empate
async function getBrandWithMostModels() {
    await getCarList();
    const brandCounts = carData.map(brand => ({
        name: brand.brand,
        count: brand.models.length
    })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    const maxCount = brandCounts[0].count;
    return brandCounts.filter(brand => brand.count === maxCount).map(brand => brand.name);
}

// Retorna a marca(s) com menos modelos, ou uma lista em caso de empate
async function getBrandWithLeastModels() {
    await getCarList();
    const brandCounts = carData.map(brand => ({
        name: brand.brand,
        count: brand.models.length
    })).sort((a, b) => a.count - b.count || a.name.localeCompare(b.name));

    const minCount = brandCounts[0].count;
    return brandCounts.filter(brand => brand.count === minCount).map(brand => brand.name);
}

// Retorna as X marcas com mais modelos em formato de string com suas contagens
async function getTopBrandsByModelCount(topN) {
    await getCarList();
    const sortedBrands = carData.sort((a, b) => b.models.length - a.models.length || a.brand.localeCompare(b.brand));
    return sortedBrands.slice(0, topN).map(brand => `${brand.brand} - ${brand.models.length}`);
}

// Retorna as X marcas com menos modelos em formato de string com suas contagens
async function getBottomBrandsByModelCount(bottomN) {
    await getCarList();
    const sortedBrands = carData.sort((a, b) => a.models.length - b.models.length || a.brand.localeCompare(b.brand));
    return sortedBrands.slice(0, bottomN).map(brand => `${brand.brand} - ${brand.models.length}`);
}

// Retorna a lista de modelos para uma marca especificada, ignorando maiúsculas e minúsculas
async function getModelsByBrand(brandName) {
    await getCarList();
    const brand = carData.find(brand => brand.brand.toLowerCase() === brandName.toLowerCase());
    return brand ? brand.models : [];
}

export default {
    getBrandWithMostModels,
    getBrandWithLeastModels,
    getTopBrandsByModelCount,
    getBottomBrandsByModelCount,
    getModelsByBrand
};