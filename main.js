const fs = require('fs');
const https = require('https');


const telegramId = [123445678,12347535,123456789];


const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://bot.ethernity.game',
    'Priority': 'u=1, i',
    'Referer': 'https://bot.ethernity.game/',
    'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
};

async function coday(url, method, payloadData) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'bot.ethernity.game',
            path: url,
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                'Content-Length': 47,
            }
        };

        const req = https.request(options, res => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', error => {
            reject(error);
        });

        if (method === 'POST') {
            const jsonData = JSON.stringify(payloadData); 
            req.write(jsonData); 
        }

        req.end();
    });
}

async function main() {
    try {
        while (true) {
            for (const data of telegramId) {
                console.log("ﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـ");
                console.log('');
                console.log(`🔜 Adding 1 hour time for telegram id ${data} Loading ↻`);
                console.log('');
                console.log("ﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـ");
                
                try {
                    const payloadData = {
                        additionalTime: 3600,
                        telegramId: data 
                    };
                    
                    const claimData = await coday('/api/add-mining-time', 'POST', payloadData);

                    console.log("");
                    console.log("");
                    console.log('🟢 ADD TIME SUCCES BOS 🟢');
                    console.log("");
                    console.log("");

                        
                    const claimDataJson = JSON.parse(claimData);
                    const username = claimDataJson.username;
                    const balance = claimDataJson.tokens;
                        
                    console.log('User:', username);
                    console.log('Balance after claim:', balance);


                } catch (error) {
                    
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Retry after 5 seconds
                    continue; 
                }
            }
            
            console.log('Waiting for 60 minutes before add more time...');
            await new Promise(resolve => setTimeout(resolve, 3600000)); // Sleep for 10 minutes
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
