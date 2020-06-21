const googleSearch = require('./script')

const dbMock = [
    'dog.com',
    'cheesepuff.com',
    'nike.com',
    'dogpictures.com',
    'myfavouritedogs.com'
]

describe('googleSearch', () => {
    it('is searching google', () => {
        expect(googleSearch('testtest', dbMock)).toEqual([]);
        expect(googleSearch('dog', dbMock)).toEqual(['dog.com', 'dogpictures.com', 'myfavouritedogs.com'])
    })

    it('work with undefined and null input', () => {
        expect(googleSearch(undefined, dbMock)).toEqual([]);
        expect(googleSearch(null, dbMock)).toEqual([])
    })

    it('does not return more than 3 matches', () => {
        expect(googleSearch('.com', dbMock).length).toEqual(3);
    })
})
