import React, { useEffect } from "react";
import Presentation from "./Presentation";
import { readAllBlogs } from "../../midlleware/index";
import { connect } from "react-redux";
function Container(props) {

  useEffect(() => {
    
    props.readAllBlogs();
  },[])

  const { arrayBlogs } = props;

    return (
      <div>
        <Presentation allBlogsData={arrayBlogs} />
      </div>
    );
  
}

const mapStateToProps = (state) => {
  
  return {
    allBlogs: state.combineAllReads.readAllData,
    arrayBlogs: state.combineAllReads.readAllData.allBlogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readAllBlogs: () => dispatch(readAllBlogs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
