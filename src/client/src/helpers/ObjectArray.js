export function filterObject(objectToFilter,search,type) {
    return objectToFilter[type].toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes( search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") )
}
