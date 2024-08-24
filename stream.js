const fs = require('fs');

if (!fs.existsSync('./new Directory')) {
    fs.mkdir('./new Directory', (err) => {
if (err) throw err;
    console.log('New directory created successfully');

});
}
//Delete the directory
if (fs.existsSync('new Directory')) {
     fs.rmdir('./new Directory', (err) => {
        if (err) throw err;
        console.log('Directory Removed');
    });
    
}

