const report = require("../src/report");

describe('report', () => {
  describe('Greens', () => {
    test('one green should return "Green: 1"', () => {
      expect(report("Green")).toEqual("Green: 1");
    })

    test('two greens should return "Green: 2"', () => {
      expect(report("Green, Green")).toEqual("Green: 2");
    })

    test('three greens should return "Green: 3"', () => {
      expect(report("Green, Green, Green")).toEqual("Green: 3");
    })
  })

  
    describe('Reds', () => {
      test('one Reds should return "Red: 1"', () => {
        expect(report("Red")).toEqual("Red: 1");
      })
  
      test('two Reds should return "Red: 2"', () => {
        expect(report("Red, Red")).toEqual("Red: 2");
      })
  
      test('three Reds should return "Red: 3"', () => {
        expect(report("Red, Red, Red")).toEqual("Red: 3");
      })
    })


  
    describe('Ambers', () => {
      test('one Ambers should return "Amber: 1"', () => {
        expect(report("Amber")).toEqual("Amber: 1");
      })
  
      test('two Ambers should return "Amber: 2"', () => {
        expect(report("Amber, Amber")).toEqual("Amber: 2");
      })
  
      test('three Ambers should return "Amber: 3"', () => {
        expect(report("Amber, Amber, Amber")).toEqual("Amber: 3");
      })
    })

  describe('combinations', () => {
    test('Green, Red', () => {
      expect(report("Green, Red")).toEqual("Green: 1\nRed: 1");
    })

    test('Amber, Red, Green, Red', () => {
      expect(report('Amber, Red, Green, Red')).toEqual("Green: 1\nAmber: 1\nRed: 2");
    })
  })
})