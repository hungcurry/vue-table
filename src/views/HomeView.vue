<script setup>
import { onMounted, ref , watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';

// const url = 'https://hungcurry.github.io/vue-table/'
const url = 'https://randomuser.me/api/'
// const url = 'https://vue-lessons-api.vercel.app/courses/error'
const result = ref([])
const isError = ref(false)
const device = ref('')
const message = ref('')
const route = useRoute()
const fullPath = ref('')

watch(
  () => route.fullPath, (newV , oldV) => {
    console.log(`newV`, newV);
    console.log(`oldV`, oldV);
    fullPath.value = newV.slice(1);
    console.log('fullPath' , fullPath.value);
    headeGetData()
  },
);

const data = ref([
  {
    price_components:[
      {
        price: 90000,
        step_size: 60000,
        type: "Charging By Energy",
        vat:50000,
      },
      {
        price: 70,
        step_size: 60,
        type: "Charging By Time",
        vat:5,
      },
      {
        price: 50,
        step_size: 60,
        type: "Parking By Time",
        vat:5,
      },
    ],
    restrictions:{
      end_time: "00:00",
      max_current: 160000,
      min_current: 100000,
      start_time: "00:00",
    }
  },
  {
    price_components:[{
      price: 70,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 32,
      min_current: 16,
      start_time: "00:00",
    }
  },
  //--------
  {
    price_components:[{
      price: 20,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 60,
      start_time: "00:00",
    }
  },
  {
    price_components:[{
      price: 20,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 60,
      start_time: "00:00",
    }
  },
  {
    price_components:[{
      price: 20,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 60,
      start_time: "00:00",
    }
  },
  {
    price_components:[{
      price: 20,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 60,
      start_time: "00:00",
    }
  },
  {
    price_components:[{
      price: 20,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 60,
      start_time: "00:00",
    }
  },
  {
    price_components:[{
      price: 20,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 60,
      start_time: "00:00",
    }
  },
  {
    price_components:[{
      price: 20,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 60,
      start_time: "00:00",
    }
  },
  {
    price_components:[{
      price: 20,
      step_size: 60,
      type: "TIME",
      vat:5,
    }],
    restrictions:{
      end_time: "00:00",
      max_current: 60,
      start_time: "00:00",
    }
  },
])
const handleCloseWindow = () =>{
  window.open(location.href, "_self", "");
  window.close()
}
const handlecheckOpen =() => {
  // Check opened mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  // Check opened WebView
  const isInAppWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(navigator.userAgent)
  if (isMobile && isInAppWebView) {
    device.value = 'Open in an app'
  } else {
    device.value = 'Open in a web browser'
  }
}
const headeGetData = () => {
  console.log(`url`, url + fullPath.value)
  axios.get(url + fullPath.value)
  .then((res) => {
    result.value = res?.data?.results
  })
  .catch((error) => {
    isError.value = true
    message.value = error?.response?.data
  })
}
onMounted(() => {
  handlecheckOpen()
})
</script>

<template>
  <header class="header flex-center">
    <h1 class="flex-center"><img src="../assets/images/first_msilogo.png" alt="MSILOGO"></h1>
    <button class="close primary" @click="handleCloseWindow">Close</button>
  </header>
  <div class="container">
    <h1>Test</h1>
    <p>{{ device }}</p>

    <template v-if="!isError">
      <template v-if="result?.length === 0">
        <p>查無資料</p>
      </template>
      <template v-else>
        <ul>
          <li v-for="item in result" :key="item.title">
            {{ item.name.title }} {{ item.name.first }} {{ item.name.last }}
          </li>
        </ul>
      </template>
    </template>

    <template v-else>
      <p>{{ message }}</p>
    </template>

  </div>

  <!-- <div class="container mt-4">
    <h2 class="rates-title">充電費率</h2>
    <div class="outer">
      <table class="table">
        <thead class="thead">
          <tr>
            <th scope="col" style="width: 20px;">#</th>
            <th scope='col' style="width: 390px;"><span>price_components</span></th>
            <th scope='col' style="width: 400px;">restrictions</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="(rates , idx) in data" :key="idx">
            <td scope="row">{{ idx + 1 }}</td>
            <td class="price-components">
              <div class="rates-row secondary" v-for="(item , idx) in rates.price_components" :key="idx">
                <div class="flex mb-1">
                  <p class="w-70 min-245" scope='col'>type : <span>{{ item.type }}</span></p>
                  <p class="w-30 ml-2" scope='col'>price : <span>{{ item.price }}</span></p>
                </div>
                <div class="flex mb-1">
                  <p class="w-70 min-245" scope='col'>step_size : <span>{{ item.step_size }}</span></p>
                  <p class="w-30 ml-2" scope='col'>vat : <span>{{ item.vat }}</span></p>
                </div>
              </div>
            </td>
            <td class="restrictions">
              <div class="rates-row secondary">
                <div class="flex mb-1">
                  <p class="w-50" scope='col'>start_time : <span>{{ rates.restrictions?.start_time }}</span></p>
                  <p class="w-50 ml-2" scope='col'>end_time : <span>{{ rates.restrictions?.end_time }}</span></p>
                </div>
                <div class="flex mb-1">
                  <p class="w-50" scope='col'>max_current : <span>{{ rates.restrictions?.max_current }}</span></p>
                  <p class="w-50 ml-2" scope='col'>min_current : <span>{{ rates.restrictions?.min_current }}</span></p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div> -->

</template>

<style>
:root {
  --thead: #f6f6f6;
  --primary: #8bbee1;
  --secondary: #92a9c4;
  --white: #f6f6f6;
  --black: #1e1e1e;
  --border: #747576;
  --hover: #202428;
}
body {
  font-family: 'Noto Sans TC', sans-serif;
  margin: 0;
  padding: 0;
  /* background-color: #2E343A;
  color: var(--white); */
}
#app {
  background-color: #2E343A;
  color: var(--white);
  height: 100vh;
}
h1,h2,h3,h4,h5,h6 {
  margin: 0;
  padding: 0;
}
</style>

<style lang='scss' scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap');

.container {
  max-width: 810px;
  margin: 0 auto;
  padding: 0 15px;
  @media screen and (min-width: 920px){
    max-width: 960px;
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
}
.outer {
  width: 100%;
  overflow: auto;
  height: calc(100vh - 140px);
  @media screen and (min-width: 920px){
    overflow-x: hidden;
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-corner {
    background-color: #eaedef;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c6c6c6;
    border-radius: 20px;
  }
}
.close {
  position: absolute;
  right: 30px;
  top: 15px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: var(--primary);
  color: var(--white);
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--secondary);
  }
}
.rates-row {
  padding: 2px 4px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: var(--white);
}
.rates-title {
  caption-side: top;
  text-align: center;
  padding-bottom: 10px;
  font-weight: bold;
  font-size: 22px;
}
.table{
  width: 900px;
  border-collapse: collapse;
  margin: 0 15px 15px 5px;
  border-spacing: 0;
  caret-color: transparent;
  table-layout: fixed;
  user-select: none;
  @media screen and (min-width: 920px){
    margin: 0 auto 15px auto;
  }
  & tr:hover {
    background-color: var(--hover);
  }
  & td, & th{
    outline: 0.1px solid var(--border);
    padding: 8px 16px;
    text-align: center;
  }
  & td p{
    margin: 0;
    text-align: left;
    padding: 2px 4px;
    text-wrap: nowrap;
    color: var(--black);
  }
  & td span {
    display: inline-block;
    vertical-align: baseline;
    margin-left: 5px;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 700;
  }
  & td > div:first-child {
    margin-top: 8px;
  }
  thead tr th {
    position:sticky;
    top:0; /* 列首永遠固定於上 */
    z-index: 1;
    background-color: var(--secondary);
  }
  th:first-child{
    z-index:2;
  }
}
.secondary {
  box-shadow: 1px 2px 4px #403f3f;
  border-bottom: 4px solid var(--secondary);
}
.flex {
  display: flex;
  justify-content: space-between;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.w-50 {
  width: 50%;
}
.w-70 {
  width: 70%;
}
.w-30 {
  width: 30%;
}
.min-245{
  min-width: 225px;
}
.mt-4{
  margin-top: 16px;
}
.mb-1{
  margin-bottom: 4px;
}
.ml-2{
  margin-left: 8px;
}










// .table {
//   width: 100%;
//   margin-bottom: 1rem;
//   color: #212529;
//   border-collapse: collapse;
//   border-spacing: 0;
//   background-color: #fff;
//   min-width: 576px;
//   td p {
//     text-align: center;
//   }
//   th,
//   td {
//     padding: 0.75rem;
//     vertical-align: top;
//     border-top: 1px solid #dee2e6;
//     text-align: center;
//   }
//   thead th {
//     vertical-align: bottom;
//     border-bottom: 2px solid #dee2e6;
//   }
//   tbody + tbody {
//     border-top: 2px solid #dee2e6;
//   }
//   .table-bordered {
//     border: 1px solid #dee2e6;
//     thead,tbody,tfoot {
//       border: 1px solid #dee2e6;
//     }
//   }
//   th,td {
//     border: 1px solid #dee2e6;
//   }
//   th {
//     text-align: inherit;
//   }
//   .table-striped tbody tr:nth-of-type(odd) {
//     background-color: rgba(0, 0, 0, 0.05);
//   }
//   tbody tr:hover {
//     background-color: rgba(0, 0, 0, 0.075);
//   }
//   th {
//     font-weight: 500;
//   }
//   td {
//     font-weight: 400;
//   }
//   th,
//   td {
//     padding: 0.5rem;
//     text-align: left;
//   }
//   th {
//     text-align: inherit;
//   }
//   .table-bordered {
//     border: 1px solid #dee2e6;
//   }
//   thead th {
//     border-bottom-width: 2px;
//   }
//   .table-borderless th,
//   .table-borderless td,
//   .table-borderless thead th,
//   .table-borderless tbody + tbody {
//     border: 0;
//   }
//   .table-striped tbody tr:nth-of-type(odd) {
//     background-color: rgba(0, 0, 0, 0.05);
//   }
//   tbody tr:hover {
//     background-color: rgba(0, 0, 0, 0.075);
//   }
//   th {
//     text-align: inherit;
//   }
//   .table-active,
//   .table-active > th,
//   .table-active > td {
//     background-color: rgba
//   }
// }
</style>
