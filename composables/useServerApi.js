

export const useServerApi = async (url, option) => {

    const res = await $fetch(url, option);
    return res
}