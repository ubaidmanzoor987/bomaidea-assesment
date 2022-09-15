import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FieldInput from "@/components/core/FieldInput";
import Button from "@/components/core/Button";
import Label from "@/components/core/Label";
import { allProjectsThunk, getAppSelector, setUserId } from "@/store/app";
import DataTable from "./table";
import { HomeStyled } from "./index.styles";

const HomePageModule = () => {
  const dispatch = useDispatch();

  const { error, pending, userId } =
    useSelector(getAppSelector);

  const [obj, setObj] = useState({
    userId,
    error: "",
  });

  const onChange = (e: any) =>{
    const value = e.target.value;
    setObj({...obj, userId: value})
    if (obj.error.length > 0) {
      setObj({...obj, error: ''})
    }
  }

  const onFetchProjects = () => {
    if (obj.userId.length === 0) {
      setObj({ ...obj, error: "User id is required" });
      return;
    }
    setObj({ ...obj, error: "" });

    dispatch(setUserId(obj.userId));
    dispatch(allProjectsThunk({userId: obj.userId}));
  };

  useEffect(() => {
    if (error && error.length) {
      setObj({...obj, error: error})
    }
  }, [error])

  return (
    <HomeStyled>
      <h1>Assesment</h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 15 }}>
          <Label>User id</Label>
          <FieldInput
            name="userId"
            disabled={pending}
            style={{ width: "100%" }}
            error={obj.error.length > 0}
            onChange={onChange}
            type="number"
            value={obj.userId}
          />
          <div>
            {obj.error.length > 0 && (
              <p style={{ color: "red" }}>{obj.error}</p>
            )}
          </div>
        </div>
        <div>
          <Button onClick={onFetchProjects}>Fetch Projects</Button>
        </div>
      </div>
      <div>
        <h3>Projects</h3>
      </div>
      <div>
        <DataTable userId={obj.userId} />
      </div>
    </HomeStyled>
  );
};

export default HomePageModule;
