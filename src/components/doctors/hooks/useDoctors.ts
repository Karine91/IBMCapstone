import { useEffect, useState } from "react";
import { IDoctor } from "../../../types";

export function useDoctors(deps: any[] = []) {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  useEffect(() => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data: IDoctor[]) => {
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  }, deps);

  return doctors;
}
