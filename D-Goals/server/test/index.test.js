

const { mongoose } = require('../mongoose');
const GET = require('./export');
const datos = {}

afterAll(async (done) => {
  mongoose.disconnect(done)
})
test('the data is peanut butter', () => {
  return GET("/habit").then(data => {
    expect(data).toBe('peanut butter');
  });
});

// test('Prueba Post Request', () => {
//   expect(POST('/get_habit',datos)).toBe([{"_id":"6097c987a6af3c543a1dc514","nombre":"dormir","descripcion":"vamos a dormir para descansar","__v":0},{"_id":"6097c9f8a50fd255d6823ca3","nombre":"correr","descripcion":"correr es una actividad sana que nos permite mejorar el metabolismo","__v":0}]);
// });

// test('Prueba GET Request', done => {
//   function callback(data) {
//     try {
//       expect(data).toBe('peanut butter');
//       done();
//     } catch (error) {
//       done(error);
//     }
//   }

//   fetchData(callback);
// });