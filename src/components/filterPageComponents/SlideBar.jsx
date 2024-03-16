import { useRestaurant, useRenderCheckbox } from "../../hooks/hooks.jsx"
import { priceLength } from "../../constants/constant"
import { useEffect } from "react"
import { FilterTags } from "./FilterTags.jsx"

export const SlideBar = () => {
  const { setFilterInput, filterInput, fetchFilterData, sideBarData } =
    useRestaurant()
  const { renderCheckbox } = useRenderCheckbox()
  const { facilities, districts, categories } = sideBarData

  console.log(sideBarData)
  // fetchData when checked

  useEffect(() => {
    fetchFilterData(filterInput)
  }, [filterInput])

  const handleChangeRating = (e) => {
    setFilterInput((prev) => ({ ...prev, rating: [e.target.value] }))
  }
  // const renderCheckbox = (input, limit, key, title = "title")
  const showDistricts = renderCheckbox(districts, 6, "districtNameTh", "เขต")
  const showFacilities = renderCheckbox(
    facilities,
    4,
    "facilityName",
    "คุณสมบัติ"
  )
  const showPriceLength = renderCheckbox(priceLength, 5, "priceLength", "ราคา")
  const showCategories = renderCheckbox(
    categories,
    5,
    "categoryName",
    "ประเภทร้านค้า"
  )

  return (
    <div>
      <div className="bg-white rounded-lg p-4  flex flex-col gap-2 w-56 shadow-sm">
        <FilterTags />
        {/* radio */}
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-xl">เรตติ้ง</div>
          <div className="form-control  ">
            <label className="label cursor-pointer flex gap-2 align-middle items-center">
              <input
                type="radio"
                name="rating"
                value={3.5}
                checked={filterInput.rating?.includes("3.5")}
                onChange={handleChangeRating}
                className="radio  checked:bg-red-500 w-4 h-4"
              />
              <span className="label-text">3.5+</span>
            </label>
          </div>
          <div className="form-control  ">
            <label className="label cursor-pointer flex gap-2 align-middle items-center">
              <input
                type="radio"
                name="rating"
                value={4}
                checked={filterInput.rating?.includes("4")}
                onChange={handleChangeRating}
                className="radio checked:bg-red-500 w-4 h-4"
              />
              <span className="label-text">4+</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">{showDistricts}</div>
        <div className="flex flex-col gap-2">{showPriceLength}</div>
        <div className="flex flex-col gap-2">{showCategories}</div>
        <div className="flex flex-col gap-2">{showFacilities}</div>
      </div>
    </div>
  )
}
