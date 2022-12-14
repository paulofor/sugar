package br.com.digicom.sugar.processamento;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import br.com.digicom.sugar.dao.DaoBaseSugar;
import br.com.digicom.sugar.dao.DatasetSugar;
import br.com.digicom.sugar.daobase.DaoBase;
import br.com.digicom.sugar.modelo.PerguntaFormulario;

public class LeArquivoForm extends DaoBaseSugar{

	private String[] cabecalho;
	private List<String[]> respostas;
	private Integer[] idPergunta;
 	
	@Override
	protected void executaImpl() {
		final DatasetSugar ds = (DatasetSugar) this.getComum();
		this.respostas = new ArrayList<String[]>();
		this.leArquivo();
		this.montaIdPergunta();
		System.out.println("Montou dados");
	}
	
	private void montaIdPergunta() {
		final DatasetSugar ds = (DatasetSugar) this.getComum();
		this.idPergunta = new Integer[cabecalho.length];
		for (int i=0;i<cabecalho.length;i++) {
			Integer id = this.encontraIdPergunta(cabecalho[i]);
			idPergunta[i] = id;
		}
		
	}
	
	
	
	private Integer encontraIdPergunta(String texto) {
		final DatasetSugar ds = (DatasetSugar) this.getComum();
		for (PerguntaFormulario pergunta : ds.getListaPergunta()) {
			if (texto.trim().compareToIgnoreCase(pergunta.getTexto().trim())==0) {
				return pergunta.getId();
			}
		}
		System.out.println(texto);
		return null;
	}

	private void leArquivo() {
		System.out.println("Dir:" + System.getProperty("user.dir"));
		String row = null;
		String nomeArquivo = "resposta/Sugar Personalidade.csv";
		try {
			BufferedReader csvReader = new BufferedReader(new FileReader(nomeArquivo));
			row = csvReader.readLine();
			this.cabecalho = row.replace("\"", "").split(",");
			while ((row = csvReader.readLine()) != null) {
				String[] data = row.split(",");
				this.respostas.add(data);
				System.out.println(data.length);
			}
			csvReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	protected DaoBase getProximo() {
		// TODO Auto-generated method stub
		return null;
	}

}
