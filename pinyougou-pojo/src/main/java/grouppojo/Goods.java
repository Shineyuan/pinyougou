package grouppojo;

import pojo.TbGoods;
import pojo.TbGoodsDesc;

import java.io.Serializable;

public class Goods implements Serializable {
   private TbGoods tbGoods;
   private TbGoodsDesc tbGoodsDesc;

    public TbGoods getTbGoods() {
        return tbGoods;
    }

    public void setTbGoods(TbGoods tbGoods) {
        this.tbGoods = tbGoods;
    }

    public TbGoodsDesc getTbGoodsDesc() {
        return tbGoodsDesc;
    }

    public void setTbGoodsDesc(TbGoodsDesc tbGoodsDesc) {
        this.tbGoodsDesc = tbGoodsDesc;
    }
}
