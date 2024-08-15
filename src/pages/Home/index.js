import CompanyList from "./CompanyList";
import SreachForm from "./SearchForm";
import SkillList from "./SkillList";

function Home(){
    return(
        <>
            <div>
                <SreachForm/>
                <SkillList/>
                <CompanyList/>
            </div>           
        </>
    )
}

export default Home;