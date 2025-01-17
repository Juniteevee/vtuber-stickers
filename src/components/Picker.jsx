import {
  ImageList,
  ImageListItem,
  Popover,
  Button,
  TextField,
} from "@mui/material";
import { useState, useMemo } from "react";
import characters from "../characters.json";
import { useKonami } from 'react-konami-code';




export default function Picker({ setCharacter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  const easterEgg = () => {
      characters.push(
        {
          "id":"invis",
          "name": "Invis",
          "character": "Invis",
          "img": "invis/invis.png",
          "color": "#789a8a",
          "defaultText": {
              "text": "something",
              "x": 148,
              "y": 58,
              "r": -2,
              "s": 47
          }
        }
      )
  }

  useKonami(easterEgg);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "picker" : undefined;

  // Memoize the filtered image list items to avoid recomputing them
  // at every render
  let memoizedImageListItems = useMemo(() => {
    const s = search.toLowerCase();
    return characters.map((c, index) => {
      if (
        s === c.id ||
        c.name.toLowerCase().includes(s) ||
        c.character.toLowerCase().includes(s)
      ) {
        return (
          <ImageListItem
            key={index}
            onClick={() => {
              handleClose();
              setCharacter(index);
            }}
            sx={{
              cursor: "pointer",
              "&:hover": {
                opacity: 0.5,
              },
              "&:active": {
                opacity: 0.8,
              },
            }}
          >
            <img
              src={`./img/${c.img}`}
              srcSet={`./img/${c.img}`}
              alt={c.name}
              loading="lazy"
            />
          </ImageListItem>
        );
      }
      return null;
    });
  }, [search, setCharacter, easterEgg]);

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Pick character
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="modal"
      >
        <div className="picker-search">
          <TextField
            label="Search character"
            size="small"
            color="secondary"
            value={search}
            multiline={true}
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="image-grid-wrapper">
          <ImageList
            sx={{
              width: window.innerWidth < 600 ? 300 : 500,
              height: 450,
              overflow: "visible",
            }}
            cols={window.innerWidth < 600 ? 3 : 4}
            rowHeight={140}
            className="image-grid"
          >
            {memoizedImageListItems}
          </ImageList>
        </div>
      </Popover>
    </div>
  );
}
