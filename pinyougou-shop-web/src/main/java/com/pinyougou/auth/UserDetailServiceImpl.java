package com.pinyougou.auth;


import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.sellergoods.service.SellerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import pojo.TbSeller;

import java.util.ArrayList;
import java.util.List;
@Component("userDetailsService")
public class UserDetailServiceImpl implements UserDetailsService {
    @Reference
    private SellerService sellerService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("经过了UserDetailsServiceImpl");
        //构建角色列表
        List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
        grantedAuths.add(new SimpleGrantedAuthority("ROLE_SELLER"));
        //得到商家对象
        TbSeller seller = sellerService.findOne(username);
        if (seller != null) {
            if ("1".equals(seller.getStatus())){
                return new User(username, seller.getPassword(), grantedAuths);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
