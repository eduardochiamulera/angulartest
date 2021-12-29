import { UniqueIdService } from "./unique-id.service";
// describe('O Artefato que queremos testar', () => {
//     it('Primeira condição que queremos testar', () =>{});

//     it('Segunda condição que queremos testar', () =>{});
// });

describe(UniqueIdService.name, () => {

    let service: UniqueIdService = null;

    //Será chamado antes de cada It, e irá instanciar um novo service para os testes
    beforeEach(() => {
        service = new UniqueIdService();
    })

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
        should generate id when called with prefix`, () =>{
        const id = service.generateUniqueIdWithPrefix('app');

        expect(id.startsWith('app-')).toBeTrue();
     });

     it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
        should not generate duplicate IDs when called multiple times`, () =>{
        const ids = new Set();
        for(let i=0; i < 50; i++){
            ids.add(service.generateUniqueIdWithPrefix('app'));
        }
        
        //set não aceita valores duplicados, se tiver algum ID criado duplicado
        //não será adicionado ao SET
        expect(ids.size).toBe(50);
     });

     it(`${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} 
        should return the number of generatedIds when called`, () => {
         service.generateUniqueIdWithPrefix('app');
         service.generateUniqueIdWithPrefix('app');

         expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
     });

     it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
     should throw when called with empty`, () => {
         const emptyValues = [null, undefined, '', '0', '1'];
         emptyValues.forEach(emptyValue => {
             expect(() => service.generateUniqueIdWithPrefix(emptyValue))
             .withContext(`Empty value: ${emptyValue}`)
             .toThrow();
         })
    });
});