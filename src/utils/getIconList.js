import * as Icons from '@icon-park/vue-next'

/**
 * 获取所有可用的IconPark图标名称
 * @returns {string[]} 图标名称数组
 */
export function getAvailableIcons() {
  // 过滤掉非组件的属性
  return Object.keys(Icons).filter(key => 
    typeof Icons[key] === 'object' && 
    Icons[key].name && 
    Icons[key].render
  )
}

/**
 * 查找与给定关键字匹配的图标
 * @param {string} keyword 搜索关键字
 * @returns {string[]} 匹配的图标名称数组
 */
export function findIconsByKeyword(keyword) {
  if (!keyword) return []
  
  const lowercaseKeyword = keyword.toLowerCase()
  return getAvailableIcons().filter(iconName => 
    iconName.toLowerCase().includes(lowercaseKeyword)
  )
}

/**
 * 在控制台输出所有可用的图标
 */
export function logAllIcons() {
  const icons = getAvailableIcons()
  console.log(`共找到 ${icons.length} 个可用的IconPark图标`)
  console.log('图标列表:', icons.join(', '))
}

/**
 * 根据关键字查找图标并输出到控制台
 * @param {string} keyword 搜索关键字
 */
export function searchIcons(keyword) {
  const matchedIcons = findIconsByKeyword(keyword)
  console.log(`关键字 "${keyword}" 匹配到 ${matchedIcons.length} 个图标:`)
  console.log(matchedIcons.join(', '))
  return matchedIcons
}

// 默认导出全部工具函数
export default {
  getAvailableIcons,
  findIconsByKeyword,
  logAllIcons,
  searchIcons
} 