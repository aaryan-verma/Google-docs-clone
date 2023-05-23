import Icon from "@material-tailwind/react/Icon";
// import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from "@material-tailwind/react/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { RWebShare } from "react-web-share";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import StateToPdfMake from "draft-js-export-pdfmake";
import TextEditor from "../../components/TextEditor";
import { AuthContext } from "../../context/firebase";
import { useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth, firestore } from "../../fireabase/config";
import { doc, getDoc } from "@firebase/firestore";
import { useState } from "react";

const Editor = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  if (user === null) history.push("/");

  useEffect(() => {
    const getUerDoc = async () => {
      const docRef = doc(
        firestore,
        "userDocs",
        `${user?.uid}`,
        "docs",
        `${id}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserDoc(docSnap.data());
      else history.push("/");
    };
    getUerDoc();
  }, [id, user?.uid, history]);
  return (
    <>
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer">
          <Link to="/">
            <Icon name="description" color="blue" size="5xl" />
          </Link>
        </span>
        <div className="flex-grow px-2">
          <h2 className="">{userDoc?.name}</h2>
          <div className="flex items-center overflow-x-scroll text-sm space-x-1 ml-1 text-gray-600">
            <p className="options"><b>File</b></p>
            <p className="options"><b>Edit</b></p>
            <p className="options"><b>View</b></p>
            <p className="options"><b>Insert</b></p>
            <p className="options"><b>Format</b></p>
            <p className="options"><b>Tools</b></p>
            <p className="options"><b>Add-ons</b></p>
            <p className="options"><b>Help</b></p>
          </div>
        </div>
        {/* <Button
          size="regular"
          style={{ background: "#1A73E8" }}
          className="!bg-[#1A73E8] hover:bg-blue-500 !rounded-md md:inline-flex h-10"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={() => {
            const stateToPdfMake = new StateToPdfMake(userDoc?.editorState);
            // console.log(stateToPdfMake.generate());
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake
              .createPdf(stateToPdfMake.generate())
              .download(`${userDoc?.name}.pdf`);
          }}
        >
          <Icon name="download" size="md" />
          <span>Download</span>
        </Button> */}
         <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "user?.displayName",
        }}
        onClick={() => console.log("shared successfully!")}
        // onClick={() => {
        //   const stateToPdfMake = new StateToPdfMake(userDoc?.editorState);
        //   // console.log(stateToPdfMake.generate());
        //   pdfMake.vfs = pdfFonts.pdfMake.vfs;
        //   pdfMake
        //     .createPdf(stateToPdfMake.generate())
        //     .download(`${userDoc?.name}.pdf`);
        // }}
      >
        <Button size="regular"
          style={{ background: "#9DDEF7" , borderradius: "5px" ,color: "black"}}
          className="!bg-[#9DDEF7] hover:bg-blue-500 !rounded-md md:inline-flex h-10"
          rounded={true}
          block={false}
          iconOnly={false}
          ripple="light"
        >🔒 Share</Button>
      </RWebShare>
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          title={user?.displayName}
          onClick={() => {
            signOut(auth);
            setUser(null);
          }}
          className="cursor-pointer rounded-full h-10 w-10 ml-2"
        />
      </header>
      <TextEditor uid={user?.uid} id={id} />
    </>
  );
};

export default Editor;
