import React from "react";
import PictureItem from "./PictureItem";
import { Card, Row, Col, Modal, Upload } from "antd";
import { useDrop } from "react-dnd";
import { useEffect, useState, useCallback } from "react";
import galleryList from "./data";
import { CheckSquareTwoTone, DeleteFilled, PlusOutlined, FileImageFilled } from '@ant-design/icons';

const PictureList = () => {
    const [images, setImages] = useState(galleryList);
    const [checkedIds, setCheckedIds] = useState([]);
    // const [previewOpen, setPreviewOpen] = useState(false);
    // const [previewImage, setPreviewImage] = useState('');
    // const [previewTitle, setPreviewTitle] = useState('');
    // const [fileList, setFileList] = useState();

    // const getBase64 = (file) =>
    //     new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });

    const moveImage = useCallback((dragIndex, hoverIndex) => {
        setImages((prevCards) => {
            const clonedCards = [...prevCards];
            const removedItem = clonedCards.splice(dragIndex, 1)[0];

            clonedCards.splice(hoverIndex, 0, removedItem);
            return clonedCards;
        });
    }, []);
    const setCheck = (id) => {
        console.log("id", id);
        const cloneimages = [...images];
        const filtedData = cloneimages.filter((item) => item.id === id)
        // console.log('filtedData', filtedData)
        if (filtedData.length) {
            filtedData[0].isChecked = !filtedData[0].isChecked
        }
        if (filtedData[0].isChecked) {
            setCheckedIds((prev) => [...prev, id]);
        } else {
            //console.log('here i remove!', checkedIds.splice(checkedIds.indexOf(id), 1));
            let cloneCheckedIds = [...checkedIds];
            cloneCheckedIds.splice(checkedIds.indexOf(id), 1);
            setCheckedIds(cloneCheckedIds);
        }
        setImages(cloneimages);
    }
    const deleteImage = () => {
        const filteredImages = images.filter((item) => !checkedIds.includes(item.id));
        setImages(filteredImages);
        //console.log('filteredImages', filteredImages);
    }
    const handleChange = ({ fileList: newFileList }) => {
        //const writer = new FileSystemWritableFileStream();
        console.log('newFileList', newFileList)
    };
    const uploadButton = (
        <div className="pictureItem" style={{ width: "175px" }}>
            <FileImageFilled />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Add Images
            </div>
        </div>
    );
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
      };
    console.log('checkedIds', checkedIds);
    return (
        <Card title={checkedIds.length ? <><span style={{ float: "left" }}><CheckSquareTwoTone /> {checkedIds.length} File Selected</span></> : <><span style={{ float: "left" }}>Gallery</span></>} extra={checkedIds.length ? <><DeleteFilled style={{ color: "red" }} onClick={deleteImage} /><a onClick={deleteImage} style={{ color: "red" }}>Delete Files</a></> : <></>} bordered={true} style={{ width: "1000px", margin: "auto", minHeight: "800px" }}>
            {
                // <Row gutter={24}>
                <Col span={24} style={{ margin: "auto" }}>
                    <Row gutter={24}>
                        <Col className="ItemCol" span={8} style={{ marginTop: "1rem" }}>
                            <PictureItem image={images[0]} index={0} moveImage={moveImage} setCheck={setCheck} />
                        </Col>
                        <Col span={16}>
                            <Row>
                                {
                                    images && images.map((picture, index) => {
                                        return (
                                            <>
                                                {
                                                    index > 0 && index <= 6 &&
                                                    <Col className="" span={7} style={{ marginTop: "1rem" }}>
                                                        <PictureItem image={picture} index={index} moveImage={moveImage} setCheck={setCheck} />
                                                    </Col>

                                                }
                                            </>
                                        )
                                    })
                                }
                            </Row>
                        </Col>

                    </Row>
                </Col>
            }
            <Row>
                {
                    images && images.map((picture, index) => {
                        return (
                            <>
                                {
                                    index > 6 &&
                                    <Col className="" span={4} style={{ marginTop: "1rem", marginLeft: "1.5rem" }}>
                                        <PictureItem image={picture} index={index} moveImage={moveImage} setCheck={setCheck} width={175} />
                                    </Col>

                                }
                            </>
                        )
                    })
                }
                <Col span={4} style={{ marginTop: "1.5rem", marginLeft: "2rem" }} >
                    <Upload
                        action="https://run.mocky.io/v3/fa4c0e38-a2ed-4cc8-aba4-0123062b6e33"
                        listType="picture-card"
                        //fileList={images}
                        onPreview={onPreview}
                        showUploadList={true}
                        onChange={handleChange}
                        name="avatar"
                    >
                        {uploadButton}
                    </Upload>
                </Col>
            </Row>
        </Card >
    )
}
export default PictureList;