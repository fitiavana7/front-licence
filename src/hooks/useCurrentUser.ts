import { UserContext } from "../App";
import { useContext} from 'react'

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser doit être utilisé à l\'intérieur d\'un UserProvider');
    }
    return context;
  };
  