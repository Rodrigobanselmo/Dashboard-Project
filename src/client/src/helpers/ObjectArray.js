export function filterObject(objectToFilter,search,type) {      
    return objectToFilter[type].toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "").includes( search.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "") )
}