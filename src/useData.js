import { useState, useEffect } from "react";
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/bdos201/08f118a86d68e37b23564e392170e672/raw/410d621b5f4d91496064f3f458e282a153a55357/wpp-2019-newborns';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Population = (+d.Newborns) * 1000;
      return d;
    }
    csv(csvUrl, row).then(data => {
      setData(data.slice(0, 10));
    })
  }, [])
  
  return data;
}