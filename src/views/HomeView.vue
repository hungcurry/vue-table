<script setup>
import { onMounted, ref , reactive , computed , watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from "vue-i18n"
import axios from 'axios'
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const { t } = useI18n()
const route = useRoute()
const result = ref([])
const isError = ref(false)
const isLoad = ref(false)
const isWeb = ref(true)
const device = ref('')
const message = ref('')
const currency = ref('TWD')
const minPrice = ref(10)
const url = '/cp/tariff?evse_id='
const isCollapse = ref([])
const guestInfo = reactive({})
const weeks = computed(() => {
  if(result.value === undefined) return
  let copyData = ref(JSON.parse(JSON.stringify(data.value)))
  let weekAry = []
  copyData.value.forEach( (rates ) => {
    // week
    let weekTypeState = [
      { str: 'Mon', state: false },
      { str: 'Tue', state: false },
      { str: 'Wed', state: false },
      { str: 'Thu', state: false },
      { str: 'Fri', state: false },
      { str: 'Sat', state: false },
      { str: 'Sun', state: false }
    ]
    if(rates?.restrictions?.day_of_week === undefined) {
      weekTypeState.forEach( (type) => type.state = true)
      rates['showWeek'] = weekTypeState
      return
    }
    let data = rates?.restrictions?.day_of_week;
    weekAry = data.map(day => day.charAt(0) + day.slice(1).toLowerCase()).map(day => day.slice(0, 3))

    weekAry.forEach( (week) => {
      weekTypeState.forEach( (type) => {
        if(week === type.str) type.state = true
      })
    })
    rates['showWeek'] = weekTypeState
  })
  copyData.value.forEach((rates) => {
    // time
    const startTime = rates?.restrictions?.start_time ? rates.restrictions.start_time : '00:00'
    const endTime = rates?.restrictions?.end_time ? rates.restrictions.end_time : '23:59'
    // duration
    const minDuration = rates?.restrictions?.min_duration ? Number(rates.restrictions.min_duration) / 60 : '--'
    const maxDuration = rates?.restrictions?.max_duration ? Number(rates.restrictions.max_duration) / 60 : '--'
    // current
    const minCurrent = rates?.restrictions?.min_current ? Number(rates.restrictions.min_current)  : '--'
    const maxCurrent = rates?.restrictions?.max_current ? Number(rates.restrictions.max_current)  : '--'
    // parking
    const minParkingDuration = rates?.restrictions?.min_parking_duration ? Number(rates.restrictions.min_parking_duration) / 60 : '--'
    const maxParkingDuration = rates?.restrictions?.max_parking_duration ? Number(rates.restrictions.max_parking_duration) / 60 : '--'

    rates.showRestriction = {
      startTime,
      endTime,
      minDuration,
      maxDuration,
      minCurrent,
      maxCurrent,
      minParkingDuration,
      maxParkingDuration,
    }
  })
  console.log(`computed-copyData` , copyData.value)
  return copyData.value
})
watchEffect(() => {
  if (result.value === undefined) return
  const length = result?.value?.length
  const ary = []
  for (let i = 0; i < length; i++) {
    ary.push({ state: false })
  }
  isCollapse.value = ary
})

const data = ref([
  {
    price_components:[
      {
        price: 90000,
        step_size: 60000,
        type: "ENERGY",
        vat:50000,
      },
      // {
      //   price: 60,
      //   step_size: 180,
      //   type: "PARKING_TIME",
      //   vat:4,
      // },
    ],
    restrictions:{
      day_of_week: ['MONDAY', 'TUESDAY', 'WEDNESDAY'],
      end_time: "11:00",
      max_current: 80,
      max_duration: 14400,
      max_parking_duration: 14400,
      min_current: 30,
      min_duration: 180,
      min_parking_duration: 600,
      start_time: "00:00"
    }
  },
  {
    price_components:[
      {
        price: 500,
        step_size: 15,
        type: "ENERGY",
        vat:5,
      },
      //{
        // price: 100,
        // step_size: 120,
        // type: "PARKING_TIME",
        // vat:5,
      //},
    ],
    restrictions:{
      end_time: "00:00",
      max_current: 80,
      max_duration: 21600,
      max_parking_duration: 21600,
      min_current: 20,
      min_parking_duration: 180,
      start_time: "11:00"
    }
  },
  // --------
  // {
  //   price_components:[
  //     {
  //       price: 90000,
  //       step_size: 60000,
  //       type: "ENERGY",
  //       vat:50000,
  //     },
  //     {
  //       price: 60,
  //       step_size: 180,
  //       type: "PARKING_TIME",
  //       vat:4,
  //     },
  //   ],
  //   restrictions:{
  //     day_of_week: ['MONDAY', 'TUESDAY', 'WEDNESDAY'],
  //     end_time: "11:00",
  //     max_current: 80,
  //     max_duration: 14400,
  //     max_parking_duration: 14400,
  //     min_current: 30,
  //     min_duration: 180,
  //     min_parking_duration: 600,
  //     start_time: "00:00"
  //   }
  // },
  // {
  //   price_components:[
  //     {
  //       price: 500,
  //       step_size: 15,
  //       type: "ENERGY",
  //       vat:5,
  //     },
  //     {
  //       price: 100,
  //       step_size: 120,
  //       type: "PARKING_TIME",
  //       vat:5,
  //     },
  //   ],
  //   restrictions:{
  //     end_time: "00:00",
  //     max_current: 80,
  //     max_duration: 21600,
  //     max_parking_duration: 21600,
  //     min_current: 20,
  //     min_parking_duration: 180,
  //     start_time: "11:00"
  //   }
  // },
  // // --------
  // {
  // price_components:[
  //   {
  //     price: 90000,
  //     step_size: 60000,
  //     type: "ENERGY",
  //     vat:50000,
  //   },
  //   {
  //     price: 60,
  //     step_size: 180,
  //     type: "PARKING_TIME",
  //     vat:4,
  //   },
  // ],
  // restrictions:{
  //   day_of_week: ['MONDAY', 'TUESDAY', 'WEDNESDAY'],
  //   end_time: "11:00",
  //   max_current: 80,
  //   max_duration: 14400,
  //   max_parking_duration: 14400,
  //   min_current: 30,
  //   min_duration: 180,
  //   min_parking_duration: 600,
  //   start_time: "00:00"
  // }
  // },
  // {
  //   price_components:[
  //     {
  //       price: 500,
  //       step_size: 15,
  //       type: "ENERGY",
  //       vat:5,
  //     },
  //     {
  //       price: 100,
  //       step_size: 120,
  //       type: "PARKING_TIME",
  //       vat:5,
  //     },
  //   ],
  //   restrictions:{}
  // },
])

const handleCollapse = (id) => {
  isCollapse.value.forEach((item , index) => {
    index === id - 1 ? item.state = !item.state : item.state = false
  })
}
const handleCloseWindow = () =>{
  window.open(location.href, "_self", "")
  window.close()
}
// const handleCheckOpen = () => {
//   // Check opened mobile device
//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
//   // Check opened WebView
//   const isInAppWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(navigator.userAgent)
//   if (isMobile && isInAppWebView) {
//     device.value = 'Open app'
//     isWeb.value = false
//   } else {
//     device.value = 'Open browser'
//     isWeb.value = true
//   }
// }
// const handleGetToken = async() => {
//   if(Object.keys(route.query).length === 0) return

//   const id = Object.keys(route.query)[0]
//   const token = Object.keys(route.query)[1]
//   const idValue = route.query[id]
//   const tokenValue = route.query[token]

//   let lang = 'zh-tw'
//   if (navigator.language !== 'zh-TW') lang = 'en'
//   guestInfo.id = idValue
//   guestInfo.token = {
//     headers: {
//       'Authorization': tokenValue,
//       'X-Client-From': 'common',
//       'X-Client-Language': lang
//     }
//   }
//   console.log('query' ,route.query)
//   // import.meta.env.VUE_APP_API_VERSION
//   console.log(`url`, `dev${url}${idValue}`)
// }
const handleGetData = () => {
  message.value = t('no_data')
  if(Object.keys(route.query).length === 0) return
  if(guestInfo.id === undefined || guestInfo.token.headers.Authorization === undefined) {
    message.value = t('not_enough_parameters')
    return
  }

  isLoad.value = true
  axios.get(`dev${url}${guestInfo.id}`, guestInfo.token)
  .then((res) => {
    console.log(`res`, res);
    if(res.status === 200 && res?.data?.tariff?.elements?.length > 0) {
      currency.value = res?.data?.tariff?.currency
      minPrice.value = res?.data?.tariff?.min_price ? res?.data?.tariff?.min_price?.excl_vat : false
      result.value = res?.data?.tariff?.elements
      isLoad.value = false;
    }
  })
  .catch((error) => {
    isError.value = true;
    message.value = error?.message
    if(error.message === 'Request failed with status code 401') {
      message.value = t('token_is_invalid')
      isLoad.value = false
      return
    }
    isLoad.value = false
  })
}
// const handleCheckToken = async() => {
//   // 檢查 QRPAY_cookie 是否有值
//   let QRPAY_cookie = cookies.get("guestInfo")

//   // 如果 QRPAY_cookie 沒有值，就去重新取得 token
//   if (QRPAY_cookie === null) {
//     const token = await handleGetToken()
//     guestInfo.token = token;
//     console.log(`重新取得 token`, guestInfo.token);
//   } else {
//     // QRPAY_cookie 有值
//     // 檢查 QRPAY_cookie.token 是否有值
//     if (QRPAY_cookie.token === undefined) {
//       // QRPAY_cookie.token 沒有值
//       // 重新取得 token
//       const token = await handleGetToken()
//       guestInfo.token = token;
//       console.log(`重新取得 token`, guestInfo.token)
//     } else {
//       // QRPAY_cookie.token 有值
//       // 使用 QRPAY_cookie.token
//       guestInfo.token = QRPAY_cookie.token;
//       console.log(`使用 QRPAY_cookie.token`, guestInfo.token)
//     }
//   }
// }
onMounted( async () => {
  // await handleCheckOpen()
  // await handleGetToken()
  // await handleCheckToken()
  // await handleGetData()
  result.value = data.value

})
</script>

<template>
  <div class="wrapper">
    <header class="header flex-center">
      <div class="container w-100">
        <h1 class="flex-center" title="MSILOGO"><img src="../assets/first_msilogo.png" alt="MSILOGO"></h1>
        <button v-if="isWeb" class="close2 bg-primary" @click="handleCloseWindow">isWeb</button>
        <button class="close bg-secondary" @click="handleCloseWindow">{{ t('close') }}</button>
      </div>
    </header>

    <div class="container color">
      <h2 class="rates-title">
        <p class="text-md">{{ t('charging_rates') }}<span class="text-xs">-測試02 {{ device }}</span></p>
        <p v-if="minPrice">{{ t('minimum_payment_amount') }}$ <span class="text-md">{{ minPrice }}</span> ({{ currency  }})</p>
      </h2>

      <div class="loadingBox" v-show="isLoad">
        <div class="loading">
          <div></div>
        </div>
      </div>

      <template v-if="!isError">
        <template v-if="result?.length === 0">
          <p class="primary">{{ message }}</p>
        </template>
        <template v-else>
          <div class="outer" :class="{ fixHeight : !minPrice }">
            <div class="cardGroup">
              <div class="card" v-for="(rates , idx) in weeks" :key="idx" ref="collapseRef">
                <div class="card-circle" title="Rate">{{ t('rates') }}{{ idx + 1}}</div>
                <div class="card-header">
                  <h3 class="card-title text-black mb-2">{{ t('price_components') }}</h3>
                  <div class="price-components mb-2" v-for="(item , idx) in rates?.price_components" :key="idx">
                    <ol class="list">
                      <li class="flex">
                        <span class="inline-block w-50 pr-2">{{ t('type') }} : </span>
                        <span class="w-50 info">{{ t(item?.type) }}</span>
                      </li>
                      <li class="flex">
                        <span class="inline-block w-50 pr-2">{{ t('price') }} : </span>
                        <span class="w-50 info">{{ item?.price }}
                          <small class="tag">{{ currency  }}/{{ t('hr') }}</small>
                        </span>
                      </li>
                      <li class="flex">
                        <span class="inline-block w-50 pr-2">{{ t('unit') }} : </span>
                        <span class="w-50 info">{{ item?.type === "ENERGY" ? item?.step_size : item?.step_size / 60 }}
                          <small class="tag">/{{ t('min') }}</small>
                        </span>
                      </li>
                      <li class="flex">
                        <span class="inline-block w-50 pr-2">{{ t('vat') }} : </span>
                        <span class="w-50 info">{{ item?.vat }}
                          <small class="tag">%</small>
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
                <div class="card-body">
                  <h3 class="card-title text-black mb-2">{{ t('restrictions') }}
                    <span class="collapse" @click='handleCollapse(idx + 1)' :id="idx + 1">+</span>
                  </h3>
                  <Transition name="fade">
                    <div class="restrictions" v-show="isCollapse[idx]?.state">
                      <ol class="list">
                        <li class="flex">
                          <span class="inline-block w-50 pr-2">{{ t('start_time') }} : </span>
                          <span class="w-50 info">{{ rates?.showRestriction?.startTime }}</span>
                        </li>
                        <li class="flex">
                          <span class="inline-block w-50 pr-2">{{ t('end_time') }} : </span>
                          <span class="w-50 info">{{ rates?.showRestriction?.endTime }}</span>
                        </li>
                        <li class="flex">
                          <span class="inline-block w-50 pr-2">{{ t('min_duration') }} : </span>
                          <span class="w-50 info">{{ rates?.showRestriction?.minDuration }}
                            <small class="tag">/{{ t('min') }}</small>
                          </span>
                        </li>
                        <li class="flex">
                          <span class="inline-block w-50 pr-2">{{ t('max_duration') }} : </span>
                          <span class="w-50 info">{{ rates?.showRestriction?.maxDuration }}
                            <small class="tag">/{{ t('min') }}</small>
                          </span>
                        </li>
                        <li class="flex">
                          <span class="inline-block w-50 pr-2">{{ t('min_current') }} : </span>
                          <span class="w-50 info">{{ rates?.showRestriction?.minCurrent }}
                            <small class="tag">A</small>
                          </span>
                        </li>
                        <li class="flex">
                          <span class="inline-block w-50 pr-2">{{ t('max_current') }} : </span>
                          <span class="w-50 info">{{ rates?.showRestriction?.maxCurrent }}
                            <small class="tag">A</small>
                          </span>
                        </li>
                        <li class="flex">
                          <span class="inline-block w-70 md-w-50 pr-2">{{ t('min_parking_duration') }} : </span>
                          <span class="w-30 info">{{ rates?.showRestriction?.minParkingDuration }}
                            <small class="tag">/{{ t('min') }}</small>
                          </span>
                        </li>
                        <li class="flex">
                          <span class="inline-block w-70 md-w-50 pr-2">{{ t('max_parking_duration') }} : </span>
                          <span class="w-30 info">{{ rates?.showRestriction?.maxParkingDuration }}
                            <small class="tag">/{{ t('min') }}</small>
                          </span>
                        </li>
                        <li>
                          <span class="block mb-2">{{ t('aplied_day_of_week') }} : </span>
                          <ul class="weeksList flex flex-wrap">
                            <li v-for="(week , idx) in rates?.showWeek" :key="idx" class="mb-2">
                              <span class="inline-block weekBtn" :class="{disabled : !week.state }">{{ week.str }}</span>
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <p class="primary">{{ message }}</p>
      </template>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
:root {
  /* TariffTableView.vue 使用變數 */
  --thead: #f6f6f6;
  --primary: #8bbee1;
  --secondary: #92a9c4;
  --white: #f6f6f6;
  --black: #1e1e1e;
  --border: #747576;
  --hover: #202428;
  --disabled: #c4c4c4;
}
#app {
  font-family: 'Noto Sans TC', sans-serif , Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style lang='scss' scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap');
ul,ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
p {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
.wrapper {
  overflow: hidden;
  background-color: #2E343A;
  height: 100vh;
   * {
    box-sizing: border-box;
  }
}
.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  @media screen and (min-width: 768px){
    max-width: 720px;
  }
  &.color {
    color: var(--white);
    background-color: #2E343A;
    height: calc(100vh - 60px);
  }
  .rates-title {
    caption-side: top;
    text-align: center;
    padding: 10px 0px;
    font-weight: bold;
    margin: 0;
    position: relative;
  }
}
.header {
  background-color: var(--black);
  text-align: center;
  img {
    width: 100px;
    height: 60px;
    margin: 0 auto;
  }
  h1 {
    margin: 0;
    padding: 0;
  }
  .close {
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    color: var(--white);
    font-size: 16px;
    cursor: pointer;
  }
}
.outer {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 155px);
  padding-top: 45px;
  // position: fixed;
  // width: calc(100% - 3px);
  // top: 129px;
  // left: 0;
  &.fixHeight {
    height: calc(100vh - 127px) !important;
    top: 100px !important;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-corner {
    background-color: #2E343A;
    border-radius: 30px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--secondary);
    border-radius: 30px;
    cursor: pointer;
  }
}
.cardGroup {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;
  .card{
    width: 96%;
    margin: 0 auto;
    margin-bottom: 65px;
    padding: 8px;
    background-color: var(--white);
    border-radius: 8px;
    position: relative;
    padding-top: 30px;
    @media screen and (min-width: 768px){
      width: 650px;
    }
    &:last-child {
      margin-bottom: 10px;
    }
  }
  .card-title {
    width: fit-content;
    margin: auto;
    font-weight: 700;
    padding: 4px 8px ;
    position: relative;
    text-align: center;
    position: relative;
    &::before {
      content: '';
      width: 20px;
      height: 2px;
      position: absolute;
      background-color: var(--disabled);
      top: 50%;
      transform: translateY(50%);
      left: -25px;
    }
    &::after {
      content: '';
      width: 20px;
      height: 2px;
      position: absolute;
      background-color: var(--disabled);
      top: 50%;
      transform: translateY(50%);
      right: -25px;
    }
  }
  .card-circle {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--secondary);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    text-align: center;
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin: 14px 0;
  }
  .card-header {
    margin-bottom: 20px;
  }
  .price-components {
    padding: 8px;
    border-radius: 8px;
    background-color: #eeeded;
  }
  .restrictions {
    padding: 8px;
    border-radius: 8px;
    background-color: #e3eef7;
    overflow: hidden;
  }
  .collapse {
    width: 35px;
    height: 35px;
    line-height: 35px;
    position: absolute;
    right: -80px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    color: var(--secondary);
    font-size: 30px;
    cursor: pointer;
    user-select: none;
    @media screen and (min-width: 768px){
      width: 70px;
      right: -200%;
    }
  }
}
.list {
  > li {
    width: 100%;
    text-align: left;
    padding: 2px 4px;
    text-wrap: nowrap;
    color: var(--black);
  }
  .info {
    display: inline-block;
    vertical-align: baseline;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 700;
    color: var(--black);
  }
  .tag {
    font-size: 13px;
    color: var(--border);
    margin-left: 4px;
  }
}
.weeksList{
  li {
    width: calc(100% / 4 - 8px);
    margin-right: 8px;
  }
  .weekBtn {
    width: 100%;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 14px;
    color: var(--white);
    text-align: center;
    background-color: #61a8d8;
  }
}
.loadingBox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
  transform: scale(0.3);
  .loading {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
    div {
      position: absolute;
      width: 120px;
      height: 120px;
      border: 20px solid var(--primary);
      border-top-color: transparent;
      border-radius: 50%;
      box-sizing: content-box;
      animation: loading 0.6s linear infinite;
      top: 100px;
      left: 100px
    }
  }
}
@keyframes loading {
  0% { transform: translate(-50%,-50%) rotate(0deg); }
  100% { transform: translate(-50%,-50%) rotate(360deg); }
}
.fade-enter-active,
.fade-leave-active {
  transition: height 0.3s ease;
}
.fade-enter-from {
  height: 0px;
}
.fade-enter-to {
  height: 348px;
}
.fade-leave-from {
  height: 348px;
}
.fade-leave-to {
  height: 0px;
}
// #region Utilities
.disabled {
  background-color: var(--disabled) !important;
  color: var(--border) !important;
}
.primary {
  color: var(--primary);
}
.secondary {
  color: var(--secondary);
}
.bg-primary {
  background-color: var(--primary);
}
.bg-secondary {
  background-color: var(--secondary);
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.flex {
  display: flex;
}
.flex-between {
  justify-content: space-between;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-wrap {
  flex-wrap: wrap;
}
.text-xs {
  font-size: 16px !important;
}
.text-sm {
  font-size: 18px !important;
}
.text-md {
  font-size: 20px !important;
}
.text-lg {
  font-size: 22px !important;
}
.text-black {
  color: var(--black) !important;
}
.text-center {
  text-align: center !important;
}
.text-left {
  text-align: left !important;
}
.w-10 {
  width: 10%;
}
.w-20 {
  width: 20%;
}
.w-30 {
  width: 30%;
}
.w-35 {
  width: 35%;
}
.w-40 {
  width: 40%;
}
.w-50 {
  width: 50%;
}
.w-60 {
  width: 60%;
}
.w-65 {
  width: 65%;
}
.w-70 {
  width: 70%;
}
.w-80 {
  width: 80%;
}
.w-90 {
  width: 90%;
}
.w-100 {
  width: 100%;
}
.m-0 {
  margin: 0 !important;
}
.mt-4{
  margin-top: 16px !important;
}
.mb-1{
  margin-bottom: 4px !important;
}
.mb-2{
  margin-bottom: 8px !important;
}
.ml-2{
  margin-left: 8px !important;
}
.pr-1{
  padding-right: 4px !important;
}
.pr-2{
  padding-right: 8px !important;
}
.p-2 {
  padding: 8px !important;
}
.md-w-50 {
  @media screen and (min-width: 768px){
    width: 50% 
  }
}
.close2 {
  position: absolute;
  left: 15px;
  top: 15px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  color: var(--white);
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--secondary);
  }
}
// #endregion
</style>

