import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import SelectBox, { Item } from 'react-native-multi-selectbox-typescript'
import axios, { AxiosResponse } from 'axios'


// Options data must contain 'item' & 'id' keys

type dataAPI = {
  code: string,
  name: string,
}

type responseAPI = {
  results: dataAPI[]
}

const APIProvince = 'https://api.mysupership.vn/v1/partner/areas/province';
const APIDistrist = 'https://api.mysupership.vn/v1/partner/areas/district';
const APICommune = 'https://api.mysupership.vn/v1/partner/areas/commune';

function App() {
  const [province, setProvince] = useState<Item>()
  const [provinces, setProvinces] = useState<Item[]>()
  const [district, setDistrict] = useState<Item>()
  const [districts, setDistricts] = useState<Item[]>()
  const [commune, setCommune] = useState<Item>()
  const [communes, setCommunes] = useState<Item[]>()

  useEffect(() => {
    axios.get<responseAPI>(APIProvince).then((response: AxiosResponse<responseAPI>) => {
      let tempResult: Item[] = response.data.results.map((result) => {
        return {
          item: result.name,
          id: result.code
        }
      });
      setProvinces(tempResult);
    })
  }, [])

  useEffect(() => {
    setDistricts(undefined)
    setDistrict(undefined)
    province && axios.get<responseAPI>(APIDistrist, { params: { "province": province.id } }).then((response: AxiosResponse<responseAPI>) => {
      let tempResult: Item[] = response.data.results.map((result) => {
        return {
          item: result.name,
          id: result.code
        }
      });
      setDistricts(tempResult);
    })
  }, [province])

  useEffect(() => {
    setCommunes(undefined)
    setCommune(undefined)
    district && axios.get<responseAPI>(APIDistrist, { params: { "district": district.id } }).then((response: AxiosResponse<responseAPI>) => {
      let tempResult: Item[] = response.data.results.map((result) => {
        return {
          item: result.name,
          id: result.code
        }
      });
      setDistricts(tempResult);
    })
  }, [district])


  return (
    <View style={{ margin: 30 }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>Demos</Text>
      </View>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text>
      <SelectBox
        label="Select single"
        options={provinces}
        value={province}
        onChange={(val: Item) => setProvince(val)}
        hideInputFilter={true}
      />
      <SelectBox
        label="Select district"
        options={districts}
        value={district}
        onChange={(val: Item) => setDistrict(val)}
        hideInputFilter={true}
      />
      <SelectBox
        label="Select commune"
        options={communes}
        value={commune}
        onChange={(val: Item) => setCommune(val)}
        hideInputFilter={true}
      />












    </View>

  )

}

export default App