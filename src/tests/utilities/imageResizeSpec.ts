import { resizeImage } from '../../utilities/imageResize'
import { getResizeData } from '../../utilities/validator'
describe('resizeImage should test the functionalty of resize method ', () => {
  const query = getResizeData({
    name: 'fjord',
    height: '1234',
    width: '465'
  })
  it('should retuen true after resize the image successfully', function () {
    return resizeImage(query).then(function (result) {
      expect(result).toEqual(true)
    })
  })
  const query2 = getResizeData({
    name: 'image',
    height: '1234',
    width: '465'
  })
  it('should should retuen false cuz it faild to prossess the image cuz its not exsisted', function () {
    return resizeImage(query2).catch(function (result) {
      expect(result).toEqual(false)
    })
  })
})
