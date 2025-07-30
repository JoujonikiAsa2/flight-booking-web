"use server"

import removeTokenFromCookie from "@/helpers/remove-token"

export const logoutUser = async() =>{
    await removeTokenFromCookie()
}