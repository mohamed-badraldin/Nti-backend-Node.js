const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nti-todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('connected to mongo successfully')
})
.catch((err)=>{
    console.error(err);
    process.exit(1);
})
