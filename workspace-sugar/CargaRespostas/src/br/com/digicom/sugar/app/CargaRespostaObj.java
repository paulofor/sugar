package br.com.digicom.sugar.app;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class CargaRespostaObj {

	public void executa() {
		System.out.println("CargaRespostaObj executando..");
		leArquivo();
	}
	
	private void leArquivo() {
		System.out.println("Dir:" + System.getProperty("user.dir"));
		String row = null;
		String nomeArquivo = "resposta/Sugar Personalidade.csv";
		try {
			BufferedReader csvReader = new BufferedReader(new FileReader(nomeArquivo));
			while ((row = csvReader.readLine()) != null) {
				String[] data = row.split(",");
				// do something with the data
				System.out.println(data.length);
			}
			csvReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	

}
