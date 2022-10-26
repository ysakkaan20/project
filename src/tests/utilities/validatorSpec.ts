import * as validator from '../../utilities/validator'

describe('checkSize should check if the string of width and hieght is a number to convet it ', () => {
  it('should return true since we sent both real numbers as strings', () => {
    const data = validator.checkSize({
      name: 'filename',
      height: '1234',
      width: '465'
    })
    expect(data).toEqual(true)
  })
  it('should return false cuz we send one number as string and the other is negative number ', () => {
    const data = validator.checkSize({
      name: 'filename',
      height: '1234',
      width: '-465'
    })
    expect(data).toEqual(false)
  })
  it('should return false cuz we send some letters  and the other is negative number ', () => {
    const data = validator.checkSize({
      name: 'filename',
      height: 'word',
      width: '-465'
    })
    expect(data).toEqual(false)
  })
  it('should return false cuz we send some letters  and the other is postive  number ', () => {
    const data = validator.checkSize({
      name: 'filename',
      height: 'word',
      width: '400'
    })
    expect(data).toEqual(false)
  })
})
describe('checkImage should check if there is an image with the name provieded', () => {
  it('should return true since we sent a real image name ', () => {
    const data = validator.checkImage('fjord')
    expect(data).toEqual(true)
  })

  it('should return false since we sent a not an  image name ', () => {
    const data = validator.checkImage('image')

    expect(data).toEqual(false)
  })
})
