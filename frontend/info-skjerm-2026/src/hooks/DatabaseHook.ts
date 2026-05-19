// Denne må ha better auth

import { useQuery } from "@tanstack/react-query";

export const useDatabaseHook = (
  WhatToChange: string,
  WhatToChangeTo: string | string[] | number,
) => {
  return useQuery({
    queryKey: ["DatabaseHook", WhatToChange],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/database`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            WhatToChange: WhatToChange,
            WhatToChangeTo: WhatToChangeTo,
          }),
        },
      );
      if (response.statusText !== "OK") {
        console.log(response.status, response.statusText);
        return response.statusText;
      }
      const PutDatabaseConfirm = (await response.json()) as string;
      return PutDatabaseConfirm;
    },
  });
};
