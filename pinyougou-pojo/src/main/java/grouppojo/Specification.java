package grouppojo;

import pojo.TbSpecification;
import pojo.TbSpecificationOption;

import java.io.Serializable;
import java.util.List;

public class Specification implements Serializable {
    private TbSpecification tbSpecification;
    private List<TbSpecificationOption> tbSpecificationOptionList;

    public TbSpecification getSpecification() {
        return tbSpecification;
    }
    public void setSpecification(TbSpecification tbSpecification) {
        this.tbSpecification = tbSpecification;
    }
    public List<TbSpecificationOption> getSpecificationOptionList() {
        return tbSpecificationOptionList;
    }
    public void setSpecificationOptionList(List<TbSpecificationOption> tbSpecificationOptionList) {
        this.tbSpecificationOptionList = tbSpecificationOptionList;
    }
}