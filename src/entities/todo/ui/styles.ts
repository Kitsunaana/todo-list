import { TodoDto } from "@shared/types";

export const backgroundStyles: Record<TodoDto.Todo["status"], React.CSSProperties> = {
  working: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, rgba(194,117,207) 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid rgba(194,117,207)"
  },
  done: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, #9ccc65 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid #9ccc65"
  },
  open: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, #26c6da 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid #26c6da"
  }
}