const express = require('express');
const { PrismaClient } = require('@prisma/client');
const Redis = require("ioredis");

const redis = new Redis(6379, "redis");

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());

const prisma = new PrismaClient();

app.get('/', async (req, res) => {
    const { request = {} } = req.body;
    try {
        const cachedValue = await redis.get('datalocations');
        let mergedData;
        if (cachedValue !== null) {
            res.json(JSON.parse(cachedValue));
        } else {
            if (request == 'all') {
                const [province, cities, districts, villages] = await Promise.all([
                    prisma.indonesia_provinces.findMany({
                        select: {
                            id: true,
                            name: true,
                            meta: true,
                        }
                    }),
                    prisma.indonesia_cities.findMany({
                        select: {
                            id: true,
                            name: true,
                            meta: true,
                        }
                    }),
                    prisma.indonesia_districts.findMany({
                        select: {
                            id: true,
                            name: true,
                            meta: true,
                        }
                    }),
                    prisma.indonesia_villages.findMany({
                        select: {
                            id: true,
                            name: true,
                            meta: true,
                        }
                    }),
                ]);
                mergedData = [...province, ...cities, ...districts, ...villages];
            } else {

                const province = await prisma.indonesia_provinces.findMany({
                    select: {
                        id: true,
                        name: true,
                        meta: true,
                    }
                });
                const cities = await prisma.indonesia_cities.findMany({
                    select: {
                        id: true,
                        name: true,
                        meta: true,
                    }
                });
                const districts = await prisma.indonesia_districts.findMany({
                    select: {
                        id: true,
                        name: true,
                        meta: true,
                    }
                });
                const villages = await prisma.indonesia_villages.findMany({
                    select: {
                        id: true,
                        name: true,
                        meta: true,
                    }
                });
                mergedData = [...province, ...cities, ...districts, ...villages];
            }


            // await redis.set('datalocations', JSON.stringify(mergedData));
            res.json(mergedData);
        }
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/simple', async (req, res) => {
    return res.json({ message: 'Hello World' }, 200);
})

app.get('/algo-parallel-processing', async (req, res) => {
    
    // Contoh penggunaan
    const arr = [
        872, 431, 549, 237, 190, 885, 649, 323, 109, 764,
        557, 803, 678, 245, 899, 362, 510, 917, 104, 731,
        125, 294, 571, 453, 669, 802, 948, 219, 648, 381,
        554, 316, 783, 974, 870, 205, 441, 586, 126, 908,
        712, 930, 370, 689, 501, 843, 237, 649, 182, 593,
        794, 257, 498, 710, 315, 601, 825, 471, 693, 201,
        485, 972, 136, 639, 418, 759, 904, 258, 576, 304,
        720, 937, 645, 812, 531, 408, 793, 612, 345, 878,
        184, 572, 950, 361, 714, 508, 268, 927, 672, 417,
        538, 781, 294, 669, 852, 390, 541, 176, 607, 431
      ];
        
    mergeSortParallel(arr).then(sortedArr => {
        return res.json({ message: 'Hello World', data: sortedArr }, 200);
    });
})

async function mergeSortParallel(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    const [sortedLeft, sortedRight] = await Promise.all([
        mergeSortParallel(left),
        mergeSortParallel(right)
    ]);
    
    return merge(sortedLeft, sortedRight);
}  

function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
