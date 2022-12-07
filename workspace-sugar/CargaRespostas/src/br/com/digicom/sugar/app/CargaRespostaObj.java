package br.com.digicom.sugar.app;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import br.com.digicom.sugar.dao.DatasetSugar;
import br.com.digicom.sugar.dao.PerguntaFormulario_ListaAtivoPergunta;

public class CargaRespostaObj {

	public void executa() {
		System.out.println("CargaRespostaObj executando..");
		//leArquivo();
		DatasetSugar ds = new DatasetSugar();
		PerguntaFormulario_ListaAtivoPergunta exec = new PerguntaFormulario_ListaAtivoPergunta();
		exec.setComum(ds);
		exec.executa();
		
	}
	
	private void leArquivo() {
		System.out.println("Dir:" + System.getProperty("user.dir"));
		String row = null;
		String nomeArquivo = "resposta/Sugar Personalidade.csv";
		try {
			BufferedReader csvReader = new BufferedReader(new FileReader(nomeArquivo));
			while ((row = csvReader.readLine()) != null) {
				String[] data = row.split(",");
				System.out.println(data.length);
			}
			csvReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	

}
