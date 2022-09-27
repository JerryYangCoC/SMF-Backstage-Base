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
        <span class="title-span fs-medium">歷史資料</span>
        <button
          class="btn btn-default button px-0 mx-0 pt-0"
          style="position: relative; padding: 0;"
        >
          <span>
            <!-- @mouseover="RFMShow = true" @mouseleave="RFMShow = false" -->
            <img
              src="../assets/question-img.svg"
              style="width: 24px; position: relative; top: -1px"
              @mouseover="RFMShow = true"
              @mouseleave="RFMShow = false"
          /></span>
          <div
            class="parent-popout-inRFMpage"
            @mouseover="RFMShow = true"
            @mouseleave="RFMShow = false"
          >
            <div v-show="RFMShow" class="child-popout3-inRFMpage">
              數據總數
              <br />
              因為空間出口與攝影機角度關係，辨識總人數不等於進、出人數加總。
              <div class="container__arrow"></div>
            </div>
          </div>
        </button>
      </div>

      <div class="dropdown">
        <a
          class="
            btn
            dropdown-toggle
            datepicker
            d-flex
            justify-content-between
            align-items-center
          "
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="font-size: 14px"
        >
          <span class="d-flex align-items-center">
            <img
              class="me-2"
              src="../assets/black-calendar.svg"
              alt="calendar"
            />
            <span>{{ dateSelector }}</span>
          </span>
          <span> {{ startDate + '~' + endDate }} </span>
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li class="change-date-li">
            <button class="change-date-button" @click="getPass1Days">
              最近1天
            </button>
          </li>
          <li class="change-date-li">
            <button class="change-date-button" @click="getPass7Days">
              最近7天
            </button>
          </li>
          <li class="change-date-li">
            <button class="change-date-button" @click="getRecentMonth">
              最近30天
            </button>
          </li>
          <li class="change-date-li">
            <button class="change-date-button" @click="getRecentYear">
              最近一年
            </button>
          </li>
          <li class="change-date-li">
            <button
              type="button"
              class="change-date-button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              自訂
            </button>
          </li>
          <!-- <li class="change-date-li">
            <button class="change-date-button" @click="getRecentAll">
              全部
            </button>
          </li> -->
        </ul>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"></h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <DatePicker
                :from-page="{ month: this.endMonth, year: this.endYear }"
                @dayclick="onDayClick"
                v-model="vue3Date"
                is-expanded
                is-range
                :model-config="modelConfig"
                :min-date="hasDataFirst"
                :max-date="hasDataEnd"
              />
              <!-- :max-date="hasDataEnd" -->
              <p class="mt-3 mb-0" v-if="vue3Date.start != ''">
                {{ vue3Date.start }}~{{ vue3Date.end }}
              </p>

              <button
                class="btn confrim-btn mt-3"
                @click="customDatePicker"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                選取
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4" >
      <div class="flex-wrap-1">
        <div class="line-bar-div">
            <div class="pie-div-OperationalOverview">
              <span class="fs-small" style="color: #71afb6">每日人流數圖</span>
              <div id="lineBar" style="position: relative">
                <apexchart
                  type="line"
                  height="250"
                  :options="mixOptions"
                  :series="mixSeries"
                ></apexchart>
              </div>
          </div>
        </div>
      </div>
      <div class="flex-wrap-2">
        <div class="line-bar-div">
            <div class="pie-div-OperationalOverview">
              <span class="fs-small" style="color: #71afb6">總人流分佈圖</span>
              <div id="maps" style="position: relative">
                <div class="box">
                  <div id="map-cnv" class="maps-box">
                    <!-- <svg width="200" height="300">
                      <circle r="1" fill="#26963c" cx="100" cy="200">more circle nodes...</circle>
                    </svg> -->
                    <apexchart type="scatter" height="290" :options="chartOptions" :series="chartseries"></apexchart>
                  </div>
                  <div class="maps-items">
                    <div>
                      <img src="../assets/icon/Ellipse211.png">&nbsp;&nbsp;
                      <span class="font-14 Gray54">Ｉ棟</span>&nbsp;
                      <span class="font-14 Gray54">{{ (peopleCount ? peopleCount[0] : 0 ).toLocaleString() }}人</span>
                    </div>
                    <!-- <div>
                      <img src="../assets/icon/Ellipse211.png">&nbsp;&nbsp;
                      <span>Ｉ2棟</span>&nbsp;
                      <span>{{ peopleCount?.[2].toLocaleString() }}人</span>
                    </div> -->
                    <div>
                      <img src="../assets/icon/Ellipse213.png">&nbsp;&nbsp;
                      <span class="font-14 Gray54">Ｇ棟</span>&nbsp;
                      <span class="font-14 Gray54">{{ peopleCount?.[1].toLocaleString() }}人</span>
                    </div>
                    <div>
                      <img src="../assets/icon/Ellipse212.png">&nbsp;&nbsp;
                      <span class="font-14 Gray54">Ｍ棟</span>&nbsp;
                      <span class="font-14 Gray54">{{ peopleCount?.[2].toLocaleString() }}人</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div></div>
        <div class="line-bar-div">
            <div class="pie-div-OperationalOverview">
              <div class="sel-box">
                <span class="fs-small" style="color: #71afb6">進入/離開人數</span>
                <Dropdown
                  style="width: 270px"
                  :valueArr="this.dropdownValueArr"
                  :selectValue="selectedIndex"
                  :changingSelected="'selectedCity'"
                  v-on:selectValueByDrop="selectValueByDrop"
                />
              </div>
              <div id="bar" style="position: relative">
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
      <div class="flex-wrap-3">
        <div class="line-bar-div">
            <div class="pie-div-OperationalOverview">
              <span class="fs-small" style="color: #71afb6">男女占比</span>
              <div id="donut" style="position: relative">
                <apexchart
                  type="donut"
                  height="230"
                  :options="pieOptions"
                  :series="pieSeries"
                ></apexchart>
              </div>
          </div>
        </div>
        <div></div>
        <div class="line-bar-div">
            <div class="pie-div-OperationalOverview">
              <span class="fs-small" style="color: #71afb6">人流數占比</span>
              <div id="donut" style="position: relative">
                <apexchart
                  type="donut"
                  height="230"
                  :options="pie2Options"
                  :series="pie2Series"
                ></apexchart>
              </div>
          </div>
        </div>
        <div></div>
        <div class="line-bar-div">
            <div class="pie-div-OperationalOverview">
              <span class="fs-small" style="color: #71afb6">熱門時間點</span>
              <div id="bar" style="position: relative">
                <apexchart
                  type="bar"
                  height="270"
                  :options="bar2Options"
                  :series="bar2Series"
                ></apexchart>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from "moment";
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "Historical",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      loading: false,

      token: sessionStorage.getItem("token"),
      url: 'https://ssp.retailing-data.net/',

      dateSelector: "最近30天",
      startDate:  new Date(new Date().getTime() - 30*24*60*60*1000).getFullYear() + '-' + (new Date(new Date().getTime() - 30*24*60*60*1000).getMonth() + 1) + '-' + new Date(new Date().getTime() - 30*24*60*60*1000).getDate(),
      endDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      hasDataFirst: "2022-08-01",
      hasDataEnd: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      
      mixSeries: [],
      mixOptions: {},
      // selectedMixedLine: null,

      pieSeries: [],
      pieOptions: {},

      pie2Series: [],
      pie2Options: {},

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
          axisBorder: {
            show: false
          },
        },
      },

      bar2Series: [],
      bar2Options: {
        chart: {
          type: "bar",
          height: '100%',
          toolbar: {
            show: false,
          },
        },
        colors: ["#71AFB6"],
        // plotOptions: {
        //   bar: {
        //     borderRadius: 4,
        //     horizontal: true,
        //   },
        // },
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
          labels: {
            formatter: (val) => {
              return val + ':00'
            },
          },
        },
        yaxis: {
          // categories: [],
          title: {
            text: "人數",
          },
          labels: {
            show: true,
            formatter: (val) => {
                return parseInt(val)
            },
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

      peopleCount: null,

      selectedIndex: "進入",
      dropdownValueArr: [
        "進入",
        "離開"
      ],
      people: null,

      vue3Date: {
        start: "",
        end: "",
        // start: new Date("2022-01-06").toISOString().slice(0, 10),
        // end: new Date("2022-01-10").toISOString().slice(0, 10),
      },
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
        // timeAdjust: "12:00:00",
      },
      attrs: [
        {
          highlight: true,
          dates: { start: new Date("2022-03-01"), end: new Date("2022-03-18") },
        },
      ],
      endYear: 2022,
      endMonth: 9,

      RFMShow: false,
    };
  },
  beforeMount() {},
  created: async function () {
    // d3.select("#map-cnv")
    //     .append("svg")
    //     .attr("width", 500)
    //     .attr("height", 500);
    this.loading = true;
    this.getall(this.url, this.token, this.startDate, this.endDate);
    setTimeout(() => {
      this.loading = false;
    }, 300)
  },
  methods: {
    getall: async function(URL, token, firstDate, lastDate) {
      const header = {
        headers: {
          "access-token": token
        }
      }

      const parameter = '?first_date=' + firstDate + '&last_date=' + lastDate

      // axios.get(URL + 'api/flow/weather' + parameter, header)
      //   .then((res) => {
      //     console.log('weather', res)

      //   }).catch((err) => {
      //     console.log(err)
      //   })

      axios.get(URL + 'api/flow/line' + parameter, header)
        .then((res) => {
          console.log('line', res)
          // console.log('lineData', res?.data?.Data)
          // if (res?.data?.Data) this.mixedChart(res.data?.Data)
          // if (res?.data?.Data) {
          // this.selectedMixedLine = res.data.Data;
          setTimeout(() => {
            this.mixedChart(res.data.Data)
          }, 300)
          // }

        }).catch((err) => {
          console.log(err)
        })

      axios.get(URL + 'api/flow/maps' + parameter, header)
        .then((res) => {
          console.log('maps', res)
          this.peopleCount = res?.data?.Data.count
          let val = res?.data?.Data?.count
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
            // if (val[1] > 0) {
            //   if (val[1] < 1000) {
            //     this.chartseries[0].data.push([Math.random() * 0.6 + 1, Math.random() + 3.5])
            //   } else {
            //     for (let i = 0; i < Math.floor(val[1] / 1000); i++) {
            //       this.chartseries[0].data.push([Math.random() * 0.6 + 1, Math.random() + 3.5])
            //     }
            //   }
            // }
            // if (val[2] > 0) {
            //   if (val[2] < 1000) {
            //     this.chartseries[1].data.push([Math.random() * 0.6 + 1.9, Math.random() + 3.5])
            //   } else {
            //     for (let i = 0; i < Math.floor(val[2] / 1000); i++) {
            //       this.chartseries[1].data.push([Math.random() * 0.6 + 1.9, Math.random() + 3.5])
            //     }
            //   }
            // }
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
        }).catch((err) => {
          console.log(err)
        })

      axios.get(URL + 'api/flow/in_out' + parameter, header)
        .then((res) => {
          console.log('in_out', res)
          this.people = res?.data?.Data
          setTimeout(() => {
            this.barSeries = [
              {
                name: '人數',
                data: res?.data?.Data?.in.count
              },
            ]

            this.barOptions = {
              xaxis: {
                categories: res?.data?.Data?.in.building.map((s) => {
                  return s + '棟'
                }),
              }
            }
          }, 300)

        }).catch((err) => {
          console.log(err)
        })

      axios.get(URL + 'api/flow/genders' + parameter, header)
        .then((res) => {
          console.log('genders', res)
          setTimeout(() => {
            this.pieSeries = [res?.data?.Data?.男, res?.data?.Data?.女]
            this.pieOptions = {
              chart: {
                height: 250,
                offsetY: 20,
                type: "donut",
              },
              colors: [
                "#63A7C8",
                "#FFA09D",
              ],
              labels: ["男性", "女性"],
              legend: {
                position: "bottom",
              },
              dataLabels: {
                enabled: false,
              },
              responsive: [
                {
                  options: {
                    chart: {
                      // width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }
          })

        }).catch((err) => {
          console.log(err)
        })

      axios.get(URL + 'api/flow/percentages' + parameter, header)
        .then((res) => {
          console.log('percentages', res)
          setTimeout(() => {
            this.pie2Series = res?.data?.Data?.percentage
            this.pie2Options = {
              chart: {
                height: 250,
                type: "donut",
                offsetY: 20,
              },
              colors: [
                "#96C5D7",
                "#F9C357",
                "#FC9F66",
              ],
              labels: res?.data?.Data?.building.map((s) => {
                return s + '棟'
              }),
              legend: {
                position: "bottom",
              },
              dataLabels: {
                enabled: false,
              },
              responsive: [
                {
                  options: {
                    chart: {
                      // width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }
          })

        }).catch((err) => {
          console.log(err)
        })

      axios.get(URL + 'api/flow/times' + parameter, header)
        .then((res) => {
          console.log('times', res)
          setTimeout(() => {
            this.bar2Series = [
              {
                name: '人數',
                data: res?.data?.Data?.count
              },
            ]

            this.bar2Options = {
              xaxis: {
                categories: res?.data?.Data?.times
              }
            }
          }, 300)

        }).catch((err) => {
          console.log(err)
        })
    },

    selectValueByDrop(selectValue, changingSelected, index) {
      this[changingSelected] = selectValue;
      this.selectedIndex = selectValue;
      console.log("this.selectedCity", selectValue);
      this.barSeries = [
        {
          name: '人數',
          data: selectValue == '進入' ? this.people.in.count : this.people.out.count
        },
      ]

      this.barOptions = {
        xaxis: {
          categories: selectValue == '進入' ?
            this.people.in.building.map((s) => {
              return s + '棟'
            }) :
            this.people.out.building.map((s) => {
              return s + '棟'
            }),
        }
      }
    },
    
    onDayClick(day) {
      this.endYear = day.year;
      this.endMonth = day.month;
    },
    // getRecentAll: async function () {
    //   this.loading = true;
    //   await this.getTime();

    //   this.loading = false;
    //   this.dateSelector = "全部";
    // },
    getRecentYear: async function () {
      this.loading = true;
      this.selectedIndex = "進入"
      const start = moment(this.hasDataEnd).add(-1, "years");
      const strStart = moment(start._d).add(1, "days").format().slice(0, 10);
      this.startDate = strStart;
      this.endDate = this.hasDataEnd;
      console.log(strStart);

      this.getall(this.url, this.token, this.startDate, this.endDate);

      setTimeout(() => {
      this.loading = false;
    }, 300)
      this.dateSelector = "最近一年";
    },
    getRecentMonth: async function () {
      this.loading = true;
      this.selectedIndex = "進入"
      const start = moment(this.hasDataEnd).add(-1, "M");
      const strStart = moment(start._d).add(1, "days").format().slice(0, 10);
      this.startDate = strStart;
      this.endDate = this.hasDataEnd;
      console.log("start for 30", start);

      this.getall(this.url, this.token, this.startDate, this.endDate);

      setTimeout(() => {
      this.loading = false;
    }, 300)
      this.dateSelector = "最近30天";
    },
    getPass7Days: async function () {
      this.loading = true;
      this.selectedIndex = "進入"
      const start = moment(this.hasDataEnd).add(-7, "days");
      const strStart = moment(start._d).add(1, "days").format().slice(0, 10);
      this.startDate = strStart;
      this.endDate = this.hasDataEnd;
      console.log(start);
      console.log(strStart);

      this.getall(this.url, this.token, this.startDate, this.endDate);

      setTimeout(() => {
      this.loading = false;
    }, 300)
      this.dateSelector = "最近7天";
    },
    getPass1Days: async function () {
      this.loading = true;
      this.selectedIndex = "進入"
      const start = moment(this.hasDataEnd).add(-1, "days");
      const strStart = moment(start._d).add(1, "days").format().slice(0, 10);
      this.startDate = strStart;
      this.endDate = this.hasDataEnd;
      console.log(strStart);

      this.getall(this.url, this.token, this.startDate, this.endDate);

      setTimeout(() => {
      this.loading = false;
    }, 300)
      this.dateSelector = "最近1天";
    },
    customDatePicker: async function () {
      this.loading = true;
      this.selectedIndex = "進入"
      this.startDate = this.vue3Date.start.slice(0, 10);
      this.endDate = this.vue3Date.end.slice(0, 10);

      console.log("customstart", this.startDate);
      console.log("customend", this.endDate);

      this.getall(this.url, this.token, this.startDate, this.endDate);
      setTimeout(() => {
        this.loading = false;
      }, 300)
      this.dateSelector = "自訂";
    },
    show() {
      this.RFMShow = !this.RFMShow;
    },

    mixedChart(data) {
      (this.mixSeries = [
        {
          name: "總人數",
          type: "line",
          data: data?.all,
        },
        {
          name: "進入",
          type: "line",
          data: data?.in,
        },
        {
          name: "離開",
          type: "line",
          data: data?.out,
        },
      ]),
        (this.mixOptions = {
          chart: {
            // width:820,
            height: 260,
            type: "line",
            toolbar: {
              show: true,
              tools: {
                download: false,
                selection: true,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
              },
            },
          },
          colors: ["#63A7C8", "#F9C357", "#ABABAB"],
          dataLabels: {
            enabled: false,
          },

          stroke: {
            curve: "smooth",
            width: 2,
          },
          title: {
            align: "left",
            style: {
              fontSize: "20px",
              fontWeight: "medium",
              color: "#71AFB6",
            },
          },
          // grid: {
          //   borderColor: "#e7e7e7",
          //   row: {
          //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          //     opacity: 0.5,
          //   },
          // },
          markers: {
            size: 0,
          },
          tooltip: {
            y: {
              formatter: (s) => {
                  return parseInt(s)
              },
            },
          },
          xaxis: {
            categories: data?.date,
            tickAmount: 6,
            labels: {
              show: true,
              style: {
                fontSize: "12px",
              },
              rotateAlways: false,
              rotate: 0
            },
          },
          yaxis: [
            {
              tickAmount: 5,
              title: {
                text: "人數",
                style: {
                  fontSize: "12px",
                },
              },
              labels: {
                style: {
                  fontSize: "12px",
                },
                formatter: (y) => {
                  return y.toLocaleString();
                },
              },
            },
          ],

          responsive: [
            {
              //  breakpoint: 1000,
              options: {
                width: 820,
              },
            },
          ],

          legend: {
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
            offsetX: -5,
          },
        });
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
.flex-wrap-1 {
  display: grid!important;
  grid-template-columns: 1;
  margin-bottom: 2vh;
}
.flex-wrap-2 {
  display: grid!important;
  grid-template-columns: 49% 2% 49%;
  margin-bottom: 2vh;
}
.flex-wrap-3 {
  display: grid!important;
  grid-template-columns: 23.5% 2% 23.5% 2% 49%;
  margin-bottom: 2vh;
}

.title-span {
  /* font-size: 24px; */
  font-weight: bold;
  margin-right: 5px;
  align-self: center;
}
.fs-small {
  font-size: 18px;
  color: #71afb6;
}
.number-div {
  margin-right: 24px;
  margin-bottom: 24px;
  width: 100%;
  /* width: 325px; */
  padding: 0 15px;
  margin-top: 5px;
  /* margin-bottom: 2rem; */
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  height: 145px;
  display: grid;
  padding: 20px;
  align-content: space-between;
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

.dropdown-menu {
  border-top: none;
  width: 20.8vw;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.change-date-button {
  background-color: transparent;
  border: none;
  padding: 5px;
  width: 100%;
  text-align: left;
}
.change-date-li:hover {
  background-color: #eaf3f4;
}
.datepicker {
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  width: 20.8vw;
  height: 40px;
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

.sel-box {
  display: grid;
  grid-template-columns: 50% 50%;
}

.confrim-btn {
  border: none;
  background-color: #71afb6;
  color: #fff;
}
.child-popout3-inRFMpage {
  background-color: #63a7c8;
  z-index: 99;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: absolute;
  width: 500px;
  right: -500px;
  top: -6px;
  color: #fff;
  text-align: left;
  padding: 10px;
  font-size: 14px;
  cursor: default;
}
.parent-popout-inRFMpage {
  position: absolute;
  width: 17px;
  height: 40px;
  top: -5px;
  left: 20px;
}
.child-popout3-inRFMpage a:hover{
  color: #4279a6;
}
.container__arrow {
    border: 8px solid transparent;
    border-top-color: #63a7c8;
    bottom: 50%;
    height: 0;
    left: -.8%;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    transform: translate(-68%,7px) rotate(90deg);
    width: 0;
    z-index: 10;
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
