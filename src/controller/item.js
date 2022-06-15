import {
    SuccessResponse,
    ErrorResponse
} from '../lib/helper';

const Model = require('../models');
import {
    v4 as uuidv4
} from "uuid";
const {
    Item,
    Category
} = Model;

export const index = async (request, response) => {
    const data = await Item.findAll({
        include: [{
            model: Category,
            as: "category",
        }]
    });
    response.render('item/index', {
        data: data
    });
}

export const create = async (request, response) => {
    if (request.method === 'POST') {
        try {
            let gambar = null;
            const {
                kategori,
                nama,
                harga,
                deskripsi
            } = request.body;

            let data = {
                category_id: kategori,
                nama: nama,
                harga: harga,
                deskripsi: deskripsi,
                gambar: gambar
            }
            if (request.files) {
                let gambar = request.files.gambar;
                let ext = gambar.name.substr(gambar.name.lastIndexOf('.'));
                let name = '/assets/gambar/' + uuidv4() + ext;
                gambar.mv('./public' + name)
                data['gambar'] = name;
            }
            const item = await Item.create(data);
            request.flash('success', 'Success');
            response.redirect('/item/create');
            return
        } catch (error) {
            request.flash('error', 'Terjadi Kesalahan');
            response.redirect('/item/create');
            return
        }
    }
    let category = await Category.findAll();
    response.render('item/add', {
        category: category
    });
}

export const detail = async (request, response) => {
    let id = request.params.id;
    const data = await Item.findOne({
        where: {
            id,
        },
    });
    const category = await Category.findAll();
    if (!data) {
        response.send("Halaman Tidak Di Temukan")
        return
    }

    if (request.method === 'POST') {
        try {
            const {
                kategori,
                nama,
                harga,
                deskripsi
            } = request.body;

            let new_data = {
                category_id: kategori,
                nama: nama,
                harga: harga,
                deskripsi: deskripsi,
            }
            if (request.files) {
                let gambar = request.files.gambar;
                let ext = gambar.name.substr(gambar.name.lastIndexOf('.'));
                let name = '/assets/gambar/' + uuidv4() + ext;
                gambar.mv('./public' + name)
                new_data['gambar'] = name;
            }
            await data.update(new_data);
            request.flash('success', 'Success');
            response.redirect('/item');
            return
        } catch (error) {
            request.flash('error', 'Terjadi Kesalahan');
            response.redirect('/item');
            return
        }
    }
    response.render('item/edit', {
        data: data,
        category: category
    });
}

export const destroy = async (request, response) => {
    try {
        let id = request.params.id;
        await Item.destroy({
            where: {
                id
            }
        })
        return SuccessResponse(response)
    } catch (error) {
        return ErrorResponse(response, {
            message: error
        })
    }
}