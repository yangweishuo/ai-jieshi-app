<template>
  <div class="statistics-screen">
    <!-- 顶部导航 -->
    <div class="statistics-header">
      <div class="back-btn" @click="goBack">
        <tech-icon icon="ArrowLeftS" :size="24" />
      </div>
      <div class="header-title">数据统计</div>
      <button class="export-btn">
        <tech-icon icon="Download" :size="16" />
        导出数据
      </button>
    </div>
    
    <div class="statistics-content">
      <!-- 数据概览区 -->
      <div class="data-overview">
        <div class="overview-header">
          <tech-icon icon="Dashboard" :size="24" />
          数据概览
        </div>
        
        <div class="data-cards">
          <div class="data-card">
            <div class="card-title">今日未刷时长</div>
            <span class="number-3d">{{ todayData.unusedTime }}</span>
            <div class="status-badge">超越{{ todayData.rankPercentage }}%用户</div>
          </div>
          
          <div class="data-card">
            <div class="card-title">累计戒断时长</div>
            <span class="number-3d">{{ accumulatedData.totalHours }}小时</span>
            <div class="status-badge">+{{ accumulatedData.weekIncrease }}h 本周</div>
          </div>
        </div>
      </div>
      
      <!-- 核心数据卡片 -->
      <div class="core-data-card">
        <div class="card-header">
          <div class="card-title-large">
            <tech-icon icon="LineChart" :size="20" />
            戒断趋势
          </div>
          
          <div class="time-period-selector">
            <div class="time-option" 
                 :class="{ active: activePeriod === 'day' }"
                 @click="changePeriod('day')">日</div>
            <div class="time-option" 
                 :class="{ active: activePeriod === 'week' }"
                 @click="changePeriod('week')">周</div>
            <div class="time-option" 
                 :class="{ active: activePeriod === 'month' }"
                 @click="changePeriod('month')">月</div>
          </div>
        </div>
        
        <div class="progress-circle-container">
          <div class="progress-circle" :style="progressCircleStyle">
            <div class="progress-text">
              <div class="progress-value">{{ completionRate }}%</div>
              <div class="progress-label">完成率</div>
            </div>
          </div>
        </div>
        
        <div class="mini-chart-container">
          <v-chart class="trend-chart" :option="trendChartOption" :autoresize="true" />
        </div>
        
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color blue"></div>
            <span>我的趋势</span>
          </div>
          <div class="legend-item">
            <div class="legend-color purple"></div>
            <span>历史同期</span>
          </div>
          <div class="legend-item">
            <div class="legend-color gray"></div>
            <span>小组平均</span>
          </div>
        </div>
      </div>
      
      <!-- 数据分析区 -->
      <div class="data-analysis">
        <div class="analysis-title">
          <tech-icon icon="Focus" :size="20" />
          时间分配矩阵
        </div>
        
        <div class="sankey-chart">
          <v-chart class="sankey-chart-inner" :option="sankeyChartOption" :autoresize="true" />
        </div>
        <div class="chart-caption">本图展示短视频时间转移至其他活动的流向和比例</div>
        
        <div class="analysis-title" style="margin-top: 30px;">
          <tech-icon icon="Alert" :size="20" />
          成瘾风险分析
        </div>
        
        <div class="radar-chart">
          <v-chart class="radar-chart-inner" :option="radarChartOption" :autoresize="true" />
        </div>
        <div class="chart-caption">用户成瘾风险评估，数值越低风险越小</div>
      </div>
      
      <!-- 数据图表 -->
      <div class="chart-container">
        <div class="chart-header">
          <div class="chart-title">
            <tech-icon icon="LineChart" :size="22" />
            使用时长趋势
          </div>
          <div class="time-filter">
            <div class="filter-option" 
                 :class="{ active: activeTimeFilter === 'week' }"
                 @click="changeTimeFilter('week')">周</div>
            <div class="filter-option" 
                 :class="{ active: activeTimeFilter === 'month' }"
                 @click="changeTimeFilter('month')">月</div>
            <div class="filter-option" 
                 :class="{ active: activeTimeFilter === 'year' }"
                 @click="changeTimeFilter('year')">年</div>
          </div>
        </div>
        
        <div class="chart">
          <v-chart class="usage-chart" :option="usageChartOption" :autoresize="true" />
        </div>
        
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color blue"></div>
            <span>使用时长</span>
          </div>
          <div class="legend-item">
            <div class="legend-color red"></div>
            <span>目标线</span>
          </div>
        </div>
      </div>
      
      <!-- 分析洞察 -->
      <div class="chart-container">
        <div class="chart-header">
          <div class="chart-title">
            <tech-icon icon="Focus" :size="22" />
            使用洞察
          </div>
        </div>
        
        <div class="insight-cards">
          <div class="insight-card" v-for="(insight, index) in insights" :key="index">
            <div class="insight-icon">
              <tech-icon :icon="insight.icon" :size="25" />
            </div>
            <div class="insight-content">
              <div class="insight-title">{{ insight.title }}</div>
              <div class="insight-value">{{ insight.value }}</div>
              <div class="insight-desc">{{ insight.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 底部导航 -->
  <bottom-nav />
</template>

<script>
import TechIcon from '../components/TechIcon.vue'
import BottomNav from '../components/BottomNav.vue'
import { graphic } from 'echarts/core'

export default {
  name: 'StatisticsView',
  components: {
    TechIcon,
    BottomNav
  },
  data() {
    return {
      activePeriod: 'week',
      activeTimeFilter: 'month',
      completionRate: 65,
      tooltipVisible: false,
      tooltipText: '',
      tooltipStyle: {
        top: '0px',
        left: '0px'
      },
      todayData: {
        unusedTime: '4h 15m',
        rankPercentage: 68
      },
      accumulatedData: {
        totalHours: 235,
        weekIncrease: 12
      },
      dataPoints: [
        { cx: 80, cy: 150, date: '4月1日', value: '减少30分钟' },
        { cx: 120, cy: 170, date: '4月5日', value: '减少20分钟' },
        { cx: 160, cy: 130, date: '4月10日', value: '减少50分钟' },
        { cx: 200, cy: 110, date: '4月15日', value: '减少65分钟' },
        { cx: 240, cy: 90, date: '4月20日', value: '减少85分钟' },
        { cx: 280, cy: 100, date: '4月22日', value: '减少76分钟' },
        { cx: 320, cy: 70, date: '4月24日', value: '减少95分钟' },
        { cx: 360, cy: 50, date: '4月26日', value: '减少110分钟' },
        { cx: 400, cy: 60, date: '4月28日', value: '减少105分钟' },
        { cx: 440, cy: 40, date: '4月29日', value: '减少120分钟' },
        { cx: 480, cy: 40, date: '4月30日', value: '减少120分钟' }
      ],
      insights: [
        {
          title: '高峰时段',
          value: '21:00 - 23:00',
          description: '夜间使用频率最高，建议设置使用限制',
          icon: 'Time'
        },
        {
          title: '最常使用应用',
          value: '抖音 (42%)',
          description: '该应用使用时长远超其他应用',
          icon: 'Apps'
        },
        {
          title: '无使用天数',
          value: '4天',
          description: '本月已有4天完全没有使用短视频',
          icon: 'CalendarCheck'
        }
      ]
    }
  },
  computed: {
    progressCircleStyle() {
      return {
        background: `conic-gradient(var(--secondary-color) 0% ${this.completionRate}%, #f1f3f4 ${this.completionRate}% 100%)`
      }
    },
    trendChartOption() {
      return {
        grid: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50
        },
        xAxis: {
          type: 'category',
          data: ['5/15', '5/16', '5/17', '5/18', '5/19', '5/20'],
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999',
            fontSize: 10
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999',
            fontSize: 10
          }
        },
        series: [
          {
            name: '我的趋势',
            type: 'line',
            data: [160, 120, 140, 100, 60, 30],
            itemStyle: {
              color: '#1E88E5'
            },
            lineStyle: {
              width: 3,
              color: '#1E88E5'
            },
            symbolSize: 8,
            smooth: true
          },
          {
            name: '小组平均',
            type: 'line',
            data: [140, 130, 120, 110, 100, 80],
            itemStyle: {
              color: '#95a5a6'
            },
            lineStyle: {
              width: 2,
              type: 'dashed',
              color: '#95a5a6'
            },
            symbolSize: 0
          },
          {
            name: '历史同期',
            type: 'line',
            data: [150, 140, 130, 120, 90, 60],
            itemStyle: {
              color: '#7C4DFF'
            },
            lineStyle: {
              width: 2,
              type: 'dashed',
              color: '#7C4DFF'
            },
            symbolSize: 0
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        animation: true
      }
    },
    usageChartOption() {
      return {
        grid: {
          top: 30,
          right: 20,
          bottom: 30,
          left: 50
        },
        xAxis: {
          type: 'category',
          data: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999',
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 120,
          interval: 30,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999',
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        series: [
          {
            name: '使用时长',
            type: 'line',
            smooth: true,
            showSymbol: true,
            symbolSize: 8,
            data: [30, 20, 50, 65, 85, 76, 95, 110, 105, 120, 120],
            lineStyle: {
              width: 3,
              color: new graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#1E88E5' },
                { offset: 1, color: '#304FFE' }
              ])
            },
            itemStyle: {
              color: '#1E88E5',
              borderColor: '#1E88E5',
              borderWidth: 2
            },
            areaStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#304FFE', opacity: 0.5 },
                { offset: 1, color: '#304FFE', opacity: 0.05 }
              ])
            }
          },
          {
            name: '目标线',
            type: 'line',
            showSymbol: false,
            data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            lineStyle: {
              width: 2,
              type: 'dashed',
              color: '#E53935'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            const dataIndex = params[0].dataIndex;
            const dates = ['4月1日', '4月5日', '4月10日', '4月15日', '4月20日', '4月25日', '4月30日'];
            const values = ['减少30分钟', '减少20分钟', '减少50分钟', '减少65分钟', '减少85分钟', '减少76分钟', '减少95分钟'];
            
            if (dataIndex < dates.length && dataIndex < values.length) {
              return dates[dataIndex] + ': ' + values[dataIndex];
            }
            return params[0].name + ': ' + params[0].value;
          }
        },
        animation: true
      }
    },
    radarChartOption() {
      return {
        radar: {
          indicator: [
            { name: '沉迷性', max: 100 },
            { name: '心理依赖', max: 100 },
            { name: '时间消耗', max: 100 },
            { name: '社交隔离', max: 100 },
            { name: '戒断症状', max: 100 }
          ],
          radius: 80,
          splitNumber: 4,
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255, 255, 255, 0.8)', 'rgba(245, 245, 245, 0.8)']
            }
          }
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [45, 60, 80, 35, 50],
                name: '当前风险',
                areaStyle: {
                  color: 'rgba(48, 79, 254, 0.4)'
                },
                lineStyle: {
                  color: '#1E88E5',
                  width: 2
                },
                itemStyle: {
                  color: '#1E88E5'
                }
              },
              {
                value: [70, 75, 90, 65, 80],
                name: '上月风险',
                lineStyle: {
                  color: '#95a5a6',
                  width: 1,
                  type: 'dashed'
                },
                itemStyle: {
                  color: '#95a5a6'
                },
                symbol: 'none'
              }
            ]
          }
        ],
        tooltip: {
          trigger: 'item'
        }
      }
    },
    sankeyChartOption() {
      return {
        series: [
          {
            type: 'sankey',
            left: 50,
            top: 20,
            right: 50,
            bottom: 20,
            nodeWidth: 20,
            nodeGap: 10,
            layoutIterations: 32,
            emphasis: {
              focus: 'adjacency'
            },
            data: [
              { name: '短视频' },
              { name: '学习' },
              { name: '运动' },
              { name: '社交' },
              { name: '阅读' },
              { name: '工作' }
            ],
            links: [
              { source: '短视频', target: '学习', value: 35 },
              { source: '短视频', target: '运动', value: 25 },
              { source: '短视频', target: '社交', value: 20 },
              { source: '短视频', target: '阅读', value: 15 },
              { source: '短视频', target: '工作', value: 5 }
            ],
            lineStyle: {
              color: 'gradient',
              curveness: 0.5
            },
            label: {
              position: 'right'
            }
          }
        ],
        tooltip: {
          trigger: 'item'
        }
      }
    }
  },
  methods: {
    changePeriod(period) {
      this.activePeriod = period
    },
    changeTimeFilter(filter) {
      this.activeTimeFilter = filter
    },
    showTooltip(point) {
      this.tooltipText = `${point.date}: ${point.value}`
      this.tooltipVisible = true
      
      // 计算tooltip位置，确保在图表内部显示
      this.$nextTick(() => {
        const chartEl = document.querySelector('.chart');
        const tooltipEl = document.querySelector('.data-tooltip');
        
        if (chartEl && tooltipEl) {
          const chartRect = chartEl.getBoundingClientRect();
          const tooltipRect = tooltipEl.getBoundingClientRect();
          
          // 计算相对于SVG的位置
          const svgPoint = this.getSVGPoint(point.cx, point.cy);
          
          // 默认显示在点的上方
          let top = svgPoint.y - tooltipRect.height - 15;
          let left = svgPoint.x - tooltipRect.width / 2;
          
          // 确保tooltip不超出图表范围
          if (left < 0) left = 0;
          if (left + tooltipRect.width > chartRect.width) {
            left = chartRect.width - tooltipRect.width;
          }
          
          this.tooltipStyle = {
            top: `${top}px`,
            left: `${left}px`
          };
        }
      });
    },
    getSVGPoint(x, y) {
      const svgEl = document.querySelector('.chart svg');
      if (!svgEl) return { x, y };
      
      const svgRect = svgEl.getBoundingClientRect();
      const scaleX = svgRect.width / 500; // SVG viewBox宽度是500
      const scaleY = svgRect.height / 200; // SVG viewBox高度是200
      
      return {
        x: x * scaleX,
        y: y * scaleY
      };
    },
    hideTooltip() {
      this.tooltipVisible = false;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    // 添加组件加载动画效果
    setTimeout(() => {
      const elements = document.querySelectorAll('.data-card, .chart-container, .core-data-card, .data-analysis');
      elements.forEach((el, index) => {
        setTimeout(() => {
          if(el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        }, index * 100);
      });
    }, 300);
  }
}
</script>

<style scoped>
:root {
  --secondary-color: #1E88E5;
}

.statistics-screen {
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(48, 79, 254, 0.3) transparent;
}

.statistics-screen::-webkit-scrollbar {
  width: 4px;
}

.statistics-screen::-webkit-scrollbar-track {
  background: transparent;
}

.statistics-screen::-webkit-scrollbar-thumb {
  background-color: rgba(48, 79, 254, 0.3);
  border-radius: 4px;
}

.statistics-content {
  padding-bottom: 85px; /* 确保底部导航不遮挡内容 */
}

/* 顶部导航 */
.statistics-header {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: linear-gradient(135deg, rgba(30, 136, 229, 0.95), rgba(48, 79, 254, 0.95));
  color: white;
  position: relative;
  z-index: 5;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.back-btn {
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}

.back-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title::after {
  content: '';
  position: absolute;
  left: 20%;
  bottom: -5px;
  width: 60%;
  height: 2px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1px;
}

.export-btn {
  padding: 10px 15px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.export-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.export-btn .tech-icon {
  margin-right: 5px;
}

.export-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
}

.export-btn:hover::before {
  transform: translateX(100%);
  transition: transform 0.8s;
}

/* 数据概览区 */
.data-overview {
  padding: 25px 20px;
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
  border-radius: 18px;
  transform: translateY(-5px);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.data-overview:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.data-overview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #304FFE, #1E88E5);
}

.overview-header {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #333;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.overview-header .tech-icon {
  font-size: 24px;
  margin-right: 10px;
  color: var(--secondary-color);
  background: linear-gradient(135deg, #304FFE, #1E88E5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.data-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.data-card {
  flex: 1;
  background: linear-gradient(135deg, #304FFE, #1E88E5);
  color: white;
  border-radius: 18px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(30, 136, 229, 0.3);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  transform: translateY(10px);
}

.data-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 25px rgba(30, 136, 229, 0.4);
}

.data-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==');
  opacity: 0.1;
  pointer-events: none;
}

.card-title {
  font-size: 15px;
  margin-bottom: 12px;
  opacity: 0.9;
  font-weight: 500;
}

.number-3d {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.status-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 13px;
  font-weight: 600;
  background-color: rgba(46, 204, 113, 0.2);
  color: #2ECC71;
  margin-top: 8px;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 核心数据卡片 */
.core-data-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin: 15px;
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title-large {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.card-title-large .tech-icon {
  font-size: 20px;
  margin-right: 8px;
  color: var(--secondary-color);
}

.time-period-selector {
  display: flex;
  background-color: #f1f3f4;
  border-radius: 20px;
  padding: 3px;
}

.time-option {
  padding: 5px 12px;
  font-size: 12px;
  border-radius: 20px;
  cursor: pointer;
}

.time-option.active {
  background-color: var(--secondary-color);
  color: white;
  font-weight: 500;
}

.progress-circle-container {
  display: flex;
  margin: 20px 0;
  justify-content: center;
}

.progress-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(30, 136, 229, 0.15);
}

.progress-circle::before {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
}

.progress-text {
  position: relative;
  z-index: 1;
  text-align: center;
}

.progress-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 5px;
}

.progress-label {
  font-size: 14px;
  color: #666;
}

/* 小图表区域 */
.mini-chart-container {
  width: 100%;
  height: 200px;
  margin: 20px 0;
  position: relative;
}

/* 图表区域 */
.chart-container {
  background: white;
  padding: 25px 20px;
  margin: 25px 15px;
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
}

.chart-container:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #1E88E5, #304FFE);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.chart-title .tech-icon {
  font-size: 22px;
  margin-right: 10px;
  background: linear-gradient(135deg, #1E88E5, #304FFE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.time-filter {
  display: flex;
  gap: 8px;
  background: #f5f7fa;
  padding: 6px;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-option {
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 13px;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-option.active {
  background: linear-gradient(135deg, #1E88E5, #304FFE);
  color: white;
  box-shadow: 0 4px 10px rgba(48, 79, 254, 0.3);
}

.filter-option:hover:not(.active) {
  background: rgba(0, 0, 0, 0.05);
  color: #666;
}

.chart {
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  padding: 10px 0;
}

.chart svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.data-line {
  fill: none;
  stroke: url(#line-gradient);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 5px 5px rgba(30, 136, 229, 0.2));
}

.chart-dot {
  fill: white;
  stroke: #1E88E5;
  stroke-width: 2;
  r: 5;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
  cursor: pointer;
}

.chart-dot:hover {
  r: 8;
  stroke: #304FFE;
  fill: #E3F2FD;
}

.chart-area {
  fill: url(#area-gradient);
  opacity: 0.6;
}

.axis {
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 1;
}

.x-labels, .y-labels {
  fill: #999;
  font-size: 12px;
  text-anchor: middle;
}

.data-tooltip {
  position: absolute;
  background: linear-gradient(135deg, #1E88E5, #304FFE);
  color: white;
  padding: 10px 15px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  font-size: 13px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 10;
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
  transform: translateY(10px);
}

.data-tooltip::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px 8px 0;
  border-style: solid;
  border-color: #304FFE transparent transparent;
}

.data-tooltip.show {
  opacity: 1;
  transform: translateY(0);
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #666;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
}

.legend-color.blue {
  background: linear-gradient(135deg, #1E88E5, #304FFE);
}

.legend-color.red {
  background: linear-gradient(135deg, #E53935, #D32F2F);
}

.legend-color.purple {
  background: linear-gradient(135deg, #7C4DFF, #9575CD);
}

.legend-color.gray {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
}

/* 数据分析区 */
.data-analysis {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin: 15px;
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.analysis-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
}

.analysis-title .tech-icon {
  font-size: 20px;
  margin-right: 8px;
  color: var(--secondary-color);
}

.sankey-chart {
  height: 250px;
  margin: 15px 0;
  background-color: #f8f9fa;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.sankey-chart::before {
  content: 'Sankey 时间流向图';
  position: absolute;
  color: #aaa;
  font-size: 14px;
  font-weight: 500;
}

.chart-caption {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 10px;
}

/* 风险分析雷达图 */
.radar-chart {
  height: 250px;
  margin: 20px 0;
  background-color: #f8f9fa;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.radar-chart::before {
  content: '成瘾风险雷达图';
  position: absolute;
  color: #aaa;
  font-size: 14px;
  font-weight: 500;
}

/* 优化insight-cards布局 */
.insight-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

@media (max-width: 500px) {
  .insight-cards {
    grid-template-columns: 1fr;
  }
}

.insight-card {
  background: white;
  border-radius: 15px;
  padding: 18px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.insight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.insight-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(30, 136, 229, 0.1), rgba(48, 79, 254, 0.1));
  display: flex;
  justify-content: center;
  align-items: center;
}

.insight-icon .tech-icon {
  font-size: 25px;
  background: linear-gradient(135deg, #1E88E5, #304FFE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.insight-content {
  flex: 1;
}

.insight-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.insight-value {
  font-size: 18px;
  font-weight: 700;
  color: #304FFE;
  margin-bottom: 8px;
}

.insight-desc {
  font-size: 12px;
  color: #888;
  line-height: 1.4;
}

/* 引入滚动阴影效果 */
.statistics-screen::after {
  content: '';
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent);
  pointer-events: none;
  z-index: 5;
}

/* 图表容器响应式调整 */
@media (max-width: 380px) {
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .time-filter {
    align-self: center;
    width: 100%;
    justify-content: center;
  }
  
  .data-cards {
    flex-direction: column;
    gap: 15px;
  }
  
  .chart-legend {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}

/* ECharts 容器样式 */
.trend-chart {
  width: 100%;
  height: 100%;
}

.usage-chart {
  width: 100%;
  height: 250px;
}

.sankey-chart-inner {
  width: 100%;
  height: 250px;
}

.radar-chart-inner {
  width: 100%;
  height: 250px;
}

/* 移除不再需要的 SVG 样式 */
.data-line,
.chart-dot,
.chart-area,
.axis,
.x-labels,
.y-labels,
.data-tooltip {
  display: none;
}
</style> 