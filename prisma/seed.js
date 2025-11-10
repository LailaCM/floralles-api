const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

async function main() {
  const hash = await bcrypt.hash('senha123', 10);
  await prisma.user.create({
    data: [
      {
        nome: 'Administrador',
        email: 'admin@gmail.com',
        tipo: 'ADMIN',
        password: hash
      },
      {
        nome: 'Usuário',
        email: 'user@gmail.com',
        tipo: 'USER',
        password: hash
      }
    ]
  });

  await prisma.plantas.createMany({
    data: [
      {
        nome_p: 'Manjericão',
        nome_c: 'Ocimum basilicum',
        especie: 'Lamiaceae',
        classe: 'Magnoliopsida',
        origem: 'Ásia e África',
        descricao: 'Erva aromática de folhas verdes utilizadas na culinária e medicina natural.',
        beneficios: 'Possui propriedades antioxidantes, anti-inflamatórias e auxilia na digestão.',
        img: 'https://www.instaagro.com/media/wysiwyg/plantar_manjericao.jpg'
      },
      {
        nome_p: 'Babosa',
        nome_c: 'Aloe barbadensis miller',
        especie: 'Asphodelaceae',
        classe: 'Liliopsida',
        origem: 'África',
        descricao: 'Planta suculenta usada em cosméticos e medicina natural.',
        beneficios: 'Cicatrizante, hidratante e anti-inflamatória.',
        img: 'https://cdn.awsli.com.br/800x800/1539/1539472/produto/240341178/aloe-vera-6iv1z8rvf3.jpg'
      },
      {
        nome_p: 'Lírio',
        nome_c: 'Lilium candidum',
        especie: 'Liliaceae',
        classe: 'Liliopsida',
        origem: 'Europa e Ásia',
        descricao: 'Planta ornamental de flores grandes e perfumadas, símbolo de pureza e renovação.',
        beneficios: 'Usado em cosméticos e terapias aromáticas por suas propriedades calmantes.',
        img: 'https://uploads.folhabv.com.br/2025/04/bzWzcjcR-7-dicas-de-cultivo-para-o-lirio-oriental-garantir-flores-exuberantes-no-seu-jardim-1024x683.webp'
      },
      {
        nome_p: 'Flor de Lótus',
        nome_c: 'Nelumbo nucifera',
        especie: 'Nelumbonaceae',
        classe: 'Magnoliopsida',
        origem: 'Ásia',
        descricao: 'Flor aquática sagrada em várias culturas, símbolo de pureza espiritual.',
        beneficios: 'Usada na medicina tradicional para auxiliar na circulação e equilíbrio emocional.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEyBlI96_NYjyZxI1xUQoMABhpj1Fbdl6PHA&s'
      },
      {
        nome_p: 'Lavanda',
        nome_c: 'Lavandula angustifolia',
        especie: 'Lamiaceae',
        classe: 'Magnoliopsida',
        origem: 'Região do Mediterrâneo',
        descricao: 'Planta aromática com flores lilases amplamente usada em cosméticos e aromaterapia.',
        beneficios: 'Calmante natural, ajuda a reduzir o estresse e melhorar o sono.',
        img: 'https://saude.abril.com.br/wp-content/uploads/2024/12/lavanda-beneficios-saude.jpg?crop=1&resize=1212,909'
      },
      {
        nome_p: 'Vitória-Régia',
        nome_c: 'Victoria amazonica',
        especie: 'Nymphaeaceae',
        classe: 'Magnoliopsida',
        origem: 'Amazônia',
        descricao: 'Maior planta aquática do mundo, conhecida por suas folhas circulares gigantes.',
        beneficios: 'Símbolo da flora amazônica, possui compostos antioxidantes em suas folhas.',
        img: 'https://flordejambu.com/wp-content/uploads/2021/11/Ninfeia-1024x577.jpg'
      }
    ]
  });
}

main()
  .then(() => {
    console.log('Seed executada com sucesso!');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });