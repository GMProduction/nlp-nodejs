const {
    NlpManager
} = require('node-nlp');

const manager = new NlpManager({
    languages: ['id'],
    forceNER: true
})

manager.addDocument('id', 'Toko Buka Jam Berapa', 'quest.hour');
manager.addDocument('id', 'Nanti Buka Jam Berapa', 'quest.hour');
manager.addDocument('id', 'Apakah Hari Ini Buka', 'quest.hour');
manager.addDocument('id', 'Selamat Tinggal', 'greetings.bye');
manager.addDocument('id', 'Sampai Jumpa', 'greetings.bye');
manager.addDocument('id', 'Besok Ketemu lagi', 'greetings.bye');
manager.addDocument('id', 'aku harus pergi', 'greetings.bye');
manager.addDocument('id', 'hallo', 'greetings.hello');
manager.addDocument('id', 'hi', 'greetings.hello');
manager.addDocument('id', 'woi', 'greetings.hello');
manager.addDocument('id', 'aku', 'greetings.hello');

manager.addAnswer('id', 'greetings.bye', 'Oke Dada');
manager.addAnswer('id', 'greetings.hello', 'Hai Juga, Aku Anu!');
manager.addAnswer('id', 'quest.hour', 'Hai, Hari Ini Toko Buka Jam 10 pagi sampai Jam 10 Malam');

(async () => {
    await manager.train();
    manager.save();
    const response = await manager.process('id', 'Nanti Buka Jam Berapa');
    console.log(response);
})();