
const AnimeService = () => {

    const getAnime = async (offset = 1) => {
        const response = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=${6}&page[offset]=${offset}`)

        const data = await response.json()
        return data.data
    }

    const getOneAnime = async (name) => {
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${name}`)

        const data = await response.json()
        return _transformAnime(data.data[0].attributes)
    }

    const getSearchAnime = async (name) => {
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${name}`)

        const data = await response.json()
        return _transformAnime(data.data[0].attributes)
    }

    const _transformAnime = (name) => {
        return {
            titles: name.titles.en || name.titles.en_jp,
            description: name.description,
            posterImage: name.posterImage.medium,
            status: name.status,
            startDate: name.startDate,
            averageRating: name.averageRating,
            episodeCount: name.episodeCount,
            slug: name.slug
        }
    }

    return {getAnime, getOneAnime, getSearchAnime}
}

export default AnimeService
