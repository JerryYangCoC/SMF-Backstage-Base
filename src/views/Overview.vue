<template>
  <!-- loading -->
  <div class="container home">
    <div class="loading-background" v-show="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="header d-flex justify-content-between">
      <div class="d-flex" style="position: relative">
        <!-- loading -->
        <div class="loading-background" v-show="loading">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <!-- main -->
        <span class="title-span fs-medium">即時資料</span>
      </div>

      <div class="dropdown">
        <p class="ms-2 font-14 Gray77">
          {{ time ? '下次更新時間： ' + time + '秒' : '' }}
        </p>
      </div>
      <!-- Modal -->
    </div>
    <div class="mt-4" >

      <!-- 上方三個資訊 -->
      <div class="d-flex flex-wrap-4">
        <div class="over-logo-box" >
          <img src="../assets/img/popop_logo.png">
        </div>
        <div></div>
        <div class="number-div" >
          <span class="fs-small">總人數</span>
          <div class="flex-wrap-2">
            <div class="people-box">
              <img src="../assets/icon/people.png">
            </div>
            <div>
              <!-- <span class="fs-small">總人數</span> -->
              <div class="d-flex justify-between people-count">
                <span>{{ peopleCount }}</span>
                <span>(人)</span>
              </div>
            </div>
          </div>
        </div>
        <div></div>  
        <div class="number-div" >
          <span class="fs-small">男女占比</span>
          <!--男女占比-->
          <div>
            <apexchart
              type="donut"
              :options="pieOptions"
              :series="pieSeries"
            ></apexchart>
          </div>
        </div>
        <div></div>
        <div class="number-div" >
          <span class="fs-small">天氣狀況</span>
          <div class="flex-wrap-2">
            <!-- 天氣狀態圖 -->
            <div>
              <img src="../assets/img/partly_clear.png" v-show="weatherImage == 'partly_clear'">
              <img src="../assets/img/sunny.png" v-show="weatherImage == 'sunny'">
              <img src="../assets/img/rainy.png" v-show="weatherImage == 'rainy'">
              <img src="../assets/img/cloudy.png" v-show="weatherImage == 'cloudy'">
            </div>
            <div>
              <!-- <span class="fs-small">天氣狀況</span><br> -->
              <span class="font-14 Gray54">{{ weatherWx ? weatherWx : '尚未取得天氣' }}</span><br>
              <span class="font-14 Gray54">{{ weatherMaxT && weatherMinT ? weatherMinT + '°C - ' + weatherMaxT + '°C' : '' }}</span>
            </div>
          </div>

        </div>
      </div>

      <!-- 下方兩張圖 -->
      <div class="flex-wrap-2">
        <div class="line-bar-div">
          <div class="pie-div-OperationalOverview">
            <span class="fs-small" style="color: #71afb6">即時人流</span>
            <div id="maps" style="position: relative">
              <div class="box">
                <!-- 即時人流建築底圖 -->
                <div id="map-cnv" class="maps-box">
                  <!-- 即時人流冒泡圖 -->
                  <apexchart type="scatter" height="290" :options="chartOptions" :series="chartseries"></apexchart>
                </div>
                <!-- 即時人流標籤 -->
                <div class="maps-items">
                  <div>
                    <img src="../assets/icon/Ellipse211.png">&nbsp;&nbsp;
                    <span class="font-14 Gray54">Ｉ棟</span>&nbsp;
                    <span class="font-14 Gray54">{{ peopleMap?.length > 0 ? (peopleMap?.[0])?.toLocaleString() : 0 }}人</span>
                  </div>
                  <div>
                    <img src="../assets/icon/Ellipse213.png">&nbsp;&nbsp;
                    <span class="font-14 Gray54">Ｇ棟</span>&nbsp;
                    <span class="font-14 Gray54">{{ peopleMap?.length > 0 ?(peopleMap?.[1])?.toLocaleString() : 0 }}人</span>
                  </div>
                  <div>
                    <img src="../assets/icon/Ellipse212.png">&nbsp;&nbsp;
                    <span class="font-14 Gray54">Ｍ棟</span>&nbsp;
                    <span class="font-14 Gray54">{{ peopleMap?.length > 0 ? (peopleMap?.[2])?.toLocaleString() : 0 }}人</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div class="line-bar-div">
          <div class="pie-div-OperationalOverview">
            <span class="fs-small" style="color: #71afb6">當日進入人數</span>
            <div id="bar" style="position: relative">
              <!-- 當日進入人數柱狀圖 -->
              <apexchart
                type="bar"
                height="270"
                :options="barOptions"
                :series="barSeries"
              ></apexchart>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";

import axios from 'axios';
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "Overview",
  components: {
    apexchart: VueApexCharts,
    Calendar,
    DatePicker,
  },
  data() {
    return {
      loading: false,

      token: sessionStorage.getItem("token"),
      url: 'https://ssp.retailing-data.net/',

      time: 0,
      
      barSeries: [],
      barOptions: {
        chart: {
          type: "bar",
          height: '100%',
          toolbar: {
            show: false,
          },
        },
        // colors: ["#71AFB6"],
        colors: ["#96C5D7", "#96C5D7", "#F9C357", "#FC9F66"],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
            distributed: true,
          },
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          y: {
            formatter: (s) => {
                return parseInt(s)
            },
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "人數",
          },
          labels: {
            show: true,
            formatter: (s) => {
                return parseInt(s)
            }
          },
        },
      },

      chartseries: [
        {
          name: "I",
          data: []
        },{
          name: "G",
          data: []
        },{
          name: "M",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'scatter',
          animations: {
            // enabled: false,
          },
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#A2D4E8", "#FAD282", "#FCBB92"],
        legend: {
          show: false
        },
        markers: {
          size: 5
        },
        grid: {
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        tooltip: {
          enabled: false,
        },
        xaxis: {
          // tickAmount: 10,
          // show: false,
          min: 1,
          max: 3,
          labels: {
            show: false,
            // formatter: function(val) {
            //   return parseFloat(val).toFixed(1)
            // }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          // tickAmount: 7,
          // min: 0,
          max: 6,
          labels: {
            show: false,
          },
          crosshairs: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      
      pieSeries: [],
      pieOptions: {},

      peopleCount: null,
      peopleMap: [],

      weatherWx: null,
      weatherMinT: null,
      weatherMaxT: null,
      weatherImage: null,
      weatherTime: null,


      /**
       * 自動更新
       */
      autoGet: setInterval(() => {
        console.log(this.time + ' : ' + new Date().getSeconds())
        if (this.time <= 1) {
          this.time = 10
          if (window.location.pathname == '/Overview') this.getall(this.url, this.token);
        } else {
          this.time--
        }
      }, 990)
    };
  },
  beforeMount() {},
  /**
   * 創建元件進行
   */
  created: async function () {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 500)
  },
  /**
   * 元件銷毀前進行
   */
  beforeUnmount: async function () {
    /**
     * 銷毀自動更新
     */
    clearInterval(this.autoGet)
  },

  methods: {
    /**
     * 取得所有API
     * @param {string} URL API位置
     * @param {string} token 身份金鑰
     */
    getall: async function(URL, token) {
      const header = {
        headers: {
          "access-token": token
        }
      }

      /**
       * 從LocalStorage 提取天氣資料
       */
      if (!this.weatherWx) {
        this.weatherWx = localStorage.getItem('weatherWx')
        this.weatherImage = localStorage.getItem('weatherImage')
        this.weatherMinT = localStorage.getItem('weatherMinT')
        this.weatherMaxT = localStorage.getItem('weatherMaxT')
        this.weatherTime = localStorage.getItem('weatherTime')
      }

      /**
       * 當天氣資料過期進行
       */
      if (this?.weatherTime < new Date().getTime()) {
        /**
         * 呼叫天氣API
         */
        axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314')
          .then((res) => {
            // console.log('all weather', res)
            let weather_v = res.data.records.location
            let now = new Date().getTime()
            weather_v.map((v) => {
              if (v.locationName == '臺北市') {
                console.log('taipei weather', v.weatherElement)
                v.weatherElement.map((e) => {
                  if (e.elementName == 'Wx') {
                    e.time.map((wx) => {
                      /// 取得用戶所在時間段的天氣狀態
                      if ((new Date(wx.startTime).getTime() - 3*60*60*1000) < now && new Date(wx.endTime).getTime() > now) {
                        this.weatherWx = wx.parameter.parameterName
                        localStorage.setItem('weatherWx', wx.parameter.parameterName)
                        this.weatherTime = new Date(wx.endTime).getTime()
                        localStorage.setItem('weatherTime', new Date(wx.endTime).getTime())
                        switch (wx.parameter.parameterValue) {
                          case '1':
                            /// 晴天
                            this.weatherImage = 'sunny';
                            localStorage.setItem('weatherImage', 'sunny')
                            break;
  
                          case '2':
                          case '3':
                            /// 晴時有云
                            this.weatherImage = 'partly_clear';
                            localStorage.setItem('weatherImage', 'partly_clear')
                            break;
                            
                          case '4':
                          case '5':
                          case '6':
                          case '7':
                            /// 陰天
                            this.weatherImage = 'cloudy';
                            localStorage.setItem('weatherImage', 'cloudy')
                            break;
                            
                          default:
                            /// 雨天
                            this.weatherImage = 'rainy';
                            localStorage.setItem('weatherImage', 'rainy')
                            break;
                            
                        }
                      }
                    })
                  } else if (e.elementName == 'MinT') {
                    e.time.map((minT) => {
                      /// 取得用戶所在時間段的最低溫度
                      if ((new Date(minT.startTime).getTime() - 3*60*60*1000) < now && new Date(minT.endTime).getTime() > now) {
                        this.weatherMinT = minT.parameter.parameterName
                        localStorage.setItem('weatherMinT', minT.parameter.parameterName)
                      }
                    })
                  } else if (e.elementName == 'MaxT') {
                    e.time.map((maxT) => {
                      /// 取得用戶所在時間段的最高溫度
                      if ((new Date(maxT.startTime).getTime() - 3*60*60*1000) < now && new Date(maxT.endTime).getTime() > now) {
                        this.weatherMaxT = maxT.parameter.parameterName
                        localStorage.setItem('weatherMaxT', maxT.parameter.parameterName)
                      }
                    })
                  }
                })
              }
            })
          }).catch((e) => {
            console.log('get weather data err: ', e)
          })
      }


      /**
       * 取得總人數
       */
      axios.get(URL + 'api/flow/info', header)
        .then((res) => {
          console.log('info', res)
          this.peopleCount = res?.data?.Data.count

        }).catch((e) => {
          console.log('get info api err: ', e)
        })

      /**
       * 取得男女占比
       */
      axios.get(URL + 'api/flow/gender', header)
        .then((res) => {
          console.log('gender', res)
          setTimeout(() => {
            this.pieSeries = [res?.data?.Data?.男, res?.data?.Data?.女]
            this.pieOptions = {
              chart: {
                offsetY: 0,
                offsetX: 0,
                height: "100%",
                type: "donut",
              },
              colors: [
                "#63A7C8",
                "#FFA09D",
              ],
              labels: ["男性", "女性"],
              legend: {
                offsetX: 0,
                offsetY: 3,
                position: "right",
                labels: {
                  colors: '#575757'
                },
                itemMargin: {
                    horizontal: 5,
                    vertical: 0
                },
                formatter: function(seriesName, opts) {
                    return [seriesName, " ", opts.w.globals.series[opts.seriesIndex], "%"]
                }
              },
              dataLabels: {
                enabled: false,
              },
              // title: {
              //   text: "男女占比",
              //   offsetX: 140,
              //   offsetY: 30,
              //   style: {
              //     fontSize: '18px',
              //     color: '#71AFB6'
              //   }
              // }
            }
          })
          
        }).catch((e) => {
          console.log('get gender api err: ', e)
        })

      /**
       * 取得即時人流
       */
      axios.get(URL + 'api/flow/map', header)
        .then((res) => {
          console.log('map', res)
          this.peopleMap = res?.data?.Data.count
          let val = res?.data?.Data.count
          if (val.length === 3) {
            this.chartseries= [
              {
                name: "I",
                data: []
              },{
                name: "G",
                data: []
              },{
                name: "M",
                data: []
              }
            ]

            if (val[0] > 0) {
              if (val[0] < 1000) {
                this.chartseries[0].data.push([Math.random() * 1.2 + 1, Math.random() + 3.5])
              } else {
                for (let i = 0; i < Math.floor(val[0] / 1000); i++) {
                  this.chartseries[0].data.push([Math.random() * 1.2 + 1, Math.random() + 3.5])
                }
              }
            }
            if (val[1] > 0) {
              if (val[1] < 1000) {
                this.chartseries[1].data.push([Math.random() * 0.4 + 2.6, Math.random() * 0.5 + 5.5])
              } else {
                for (let i = 0; i < Math.floor(val[1] / 1000); i++) {
                  this.chartseries[1].data.push([Math.random() * 0.4 + 2.6, Math.random() * 0.5 + 5.5])
                }
              }
            }
            if (val[2] > 0) {
              if (val[2] < 1000) {
                this.chartseries[2].data.push([Math.random() * 0.16 + 2.15, Math.random() * 2 + 0.5])
              } else {
                for (let i = 0; i < Math.floor(val[2] / 1000); i++) {
                  this.chartseries[2].data.push([Math.random() * 0.16 + 2.15, Math.random() * 2 + 0.5])
                }
              }
            }
          }
        }).catch((e) => {
          console.log('get map api err: ', e)
        })

      /**
       * 取得當日進入人數
       */
      axios.get(URL + 'api/flow/in', header)
        .then((res) => {
          console.log('in', res)
          setTimeout(() => {
            this.barSeries = [
              {
                name: '人數',
                data: res?.data?.Data?.count
              },
            ]

            this.barOptions = {
              xaxis: {
                categories: res?.data?.Data?.building.map((s) => {
                  return s + '棟'
                }),
              }
            }
          }, 300)

        }).catch((e) => {
          console.log('get in api err: ', e)
        })
    },
    
  },
};
</script>

<style scoped>
.loading-background {
  position: fixed;
  left: 16.6%;
  top: 0;
  width: 83.4%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  text-align: center;
  padding: 400px 0;
  height: 100%;
}
.justify-between {
  justify-content: space-between;
}
.flex-wrap {
  display: grid!important;
  grid-template-columns: 33% 33% 33%;
}
.number-div .flex-wrap-2 {
  display: grid!important;
  grid-template-columns: 130px auto;
  /* margin-bottom: 24px; */
  /* align-items: center; */
  align-items: end;
}
.flex-wrap-2 {
  display: grid!important;
  grid-template-columns: 49% 2% 49%;
  /* margin-bottom: 24px; */
  /* align-items: center; */
  align-items: end;
}
.flex-wrap-4 {
  display: grid!important;
  grid-template-columns: 23.5% 2% 23.5% 2% 23.5% 2% 23.5%;
  margin-bottom: 24px;
}

.title-span {
  /* font-size: 24px; */
  font-weight: bold;
  margin-right: 40px;
  align-self: center;
}
.fs-small {
  font-size: 18px;
  color: #71afb6;
}
.number-div {
  margin-right: 24px;
  /* margin-bottom: 24px; */
  width: 100%;
  /* width: 325px; */
  margin-top: 5px;
  /* margin-bottom: 2rem; */
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  height: 185px;
  display: grid;
  padding: 30px;
  /* align-content: space-between; */
  align-content: center;
}
.number-div .fs-small {
  position: absolute;
  padding-left: 130px;
  padding-top: 10px;
}

.line-bar-div {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  border-radius: 15px;
  padding: 15px;
  margin-top: 5px;
  height: 315px;
  width: 100%;
  /* width: 400px; */
}
.home {
  padding: 40px 24px;
}

.people-box {
  margin-top: -4px;
  width: 76px;
  height: 76px;
  background-image: url('../assets/icon/Ellipse277.png');
  background-size: 76px 76px;
  display: grid;
  align-items: center;
  justify-content: center;
}

.box {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.maps-box {
  width: 350px;
  height: 260px;
  background-image: url('../assets/img/building_bg.png');
  background-repeat: round;
}
.over-logo-box {
  display: grid;
  align-content: center;
  /* opacity: .88; */
}

.people-count {
  padding-bottom: 10px;
}


.font-12 {
  font-size: 12px;
}
.font-14 {
  font-size: 14px;
}
.font-16 {
  font-size: 16px;
}
.font-18 {
  font-size: 18px;
}

.Gray77 {
  color: #C4C4C4;
}
.Gray54 {
  color: #8A8A8A;
}

</style>
