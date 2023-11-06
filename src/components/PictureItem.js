import React from "react";
import { Checkbox } from 'antd';
import { useDrag, useDrop } from "react-dnd";



const PictureItem = ({ image, index, moveImage, setCheck, width }) => {
    const [shouldShowCheck, setShow] = React.useState(false);
    const [showImage, setImage] = React.useState(false);
    const [draggedImageId, setDraggedId] = React.useState();
    const ref = React.useRef(null);
    const [, drop] = useDrop({
        accept: "image",
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            console.log('dragIndex', dragIndex);
            console.log('hoverIndex', hoverIndex);
            if (hoverIndex === 0) {
                setImage(true);
                //setDraggedId(item.id);
            }
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            console.log('hoverBoundingRect', ref.current);

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            console.log('clientOffset', clientOffset);
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;
            console.log('hoverClientY', hoverClientY);
            console.log('hoverClientX', hoverClientX)
            const scale = clientOffset.x;
            if (hoverIndex === 0) {
                console.log('here i am!');
                //hoverBoundingRect.width = hoverClientX;
                //hoverBoundingRect.height = hoverClientY;
                setDraggedId(scale)
                hoverBoundingRect.transform = `scale(${scale})`;
            }
            console.log('hoverBoundingRect', hoverBoundingRect);
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveImage(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag] = useDrag({
        type: "image",
        item: () => {
            let ID = image.id
            return { ID, index };
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            };
        }
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div className="pictureItem" style={{ width: width }}>
            <div className="member" style={{ opacity }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                {
                    (shouldShowCheck || image.isChecked) &&

                    <Checkbox onChange={() => setCheck(image.id)} style={{ position: "absolute", marginLeft: "1rem", marginTop: "1rem" }} />

                }{
                    (draggedImageId === image.id && showImage) ?
                        <img ref={ref} key={image.id} src={image.imagePath} width="325px" style={{}} />
                        :
                        <img ref={ref} key={image.id} src={image.imagePath} width="150px" style={{}} />
                }
            </div>
        </div>
    )
}

export default PictureItem;